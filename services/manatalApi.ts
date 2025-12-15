import axios from "axios";

const MANATAL_API_KEY =
  (import.meta as any).env?.VITE_MANATAL_API_KEY || process.env.MANATAL_API_KEY;
const MANATAL_BASE_URL = "https://api.manatal.com/open/v3";

const api = axios.create({
  baseURL: MANATAL_BASE_URL,
  headers: {
    Authorization: `Token ${MANATAL_API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ---- MOCK MODE CHECK ----
const isMock = !MANATAL_API_KEY;

export const manatalApi = {
  // ========================================================================
  // REGISTER EMPLOYER
  // ========================================================================
  async registerEmployer(data: { email?: string , full_name?: string}) {
    if (isMock) {
      console.warn("Manatal API Key missing. Returning mock success.");
      return { success: true, data: { id: Date.now(), ...data } };
    }

    try {
      // Check email exists
      if (data.email) {
        const checkResponse = await api.get(`/organizations/`, {
          params: { external_id: data.email },
        });

        if (checkResponse.data.results?.length > 0) {
          return {
            success: false,
            error: "An employer with this email already exists",
            existing: true,
          };
        }
      }

      const payload = {
        external_id: data.email || null,
        name: data.full_name || "Unnamed Employer",
      };

      const response = await api.post(`/organizations/`, payload);

      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Registration error:", error);
      return {
        success: false,
        error:
          error.response?.data?.detail ||
          error.response?.data?.message ||
          "Failed to create organization",
      };
    }
  },

  // ========================================================================
  // REGISTER CANDIDATE
  // ========================================================================
  async registerCandidate(data: { email?: string, full_name?: string }) {
    if (isMock) {
      console.warn("Manatal API Key missing. Returning mock success.");
      return { success: true, data: { id: Date.now(), ...data } };
    }

    try {
      // Email exist check
      if (data.email) {
        const checkResponse = await api.get(`/candidates/`, {
          params: { email: data.email },
        });

        if (checkResponse.data.results?.length > 0) {
          return {
            success: false,
            error: "A candidate with this email already exists",
            existing: true,
          };
        }
      }

      const payload = {
        email: data.email || "",
        full_name: data.full_name || "Unnamed Candidate",
      };

      const response = await api.post(`/candidates/`, payload);

      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Candidate registration error:", error);
      return {
        success: false,
        error:
          error.response?.data?.detail ||
          error.response?.data?.message ||
          "Failed to create candidate",
      };
    }
  },

  // ========================================================================
  // LOGIN USER
  // ========================================================================
  async loginUser(
    email: string,
    userType: "candidate" | "employer",
    otp?: string
  ) {
    if (isMock) {
      if (email === "admin" || email === "demo") {
        return {
          success: false,
          error: "Please use Admin Login for these credentials",
        };
      }
      // Check OTP from localStorage for mock
      if (otp) {
        const storedOtp = localStorage.getItem(`otp_${email}`);
        if (!storedOtp || storedOtp !== otp) {
          return { success: false, error: "Invalid OTP" };
        }
      }
      return { success: true, user: { name: "Demo User", email, id: 999 } };
    }

    try {
      if (userType === "candidate") {
        const response = await api.get(`/candidates/`, {
          params: { email },
        });

        if (response.data.results?.length > 0) {
          const candidate = response.data.results[0];
          return {
            success: true,
            user: {
              name: candidate.full_name,
              email: candidate.email,
              id: candidate.id,
            },
          };
        }
        return {
          success: false,
          error: "No account found with this email. Please register first.",
        };
      } else {
        const response = await api.get(`/organizations/`, {
          params: { external_id: email },
        });

        if (response.data.results?.length > 0) {
          const org = response.data.results[0];
          return { success: true, user: { name: org.name, email, id: org.id } };
        }

        return {
          success: false,
          error: "No account found with this email. Please register first.",
        };
      }
    } catch (error: any) {
      console.error("Login error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  },

  // ========================================================================
  // GET EMPLOYER JOBS
  // ========================================================================
  async getEmployerJobs(email: string) {
    if (isMock) {
      console.warn("Manatal API Key missing. Returning mock jobs.");
      const mockJobs = [
        {
          id: 1,
          position_name: "Domestic Helper for Elderly Care",
          status: "published",
          created_at: "2024-07-28T09:00:00Z",
          department: "Elderly Care",
          location: "Singapore",
          description:
            "Looking for a patient helper to assist with elderly care and general housekeeping.",
        },
        {
          id: 2,
          position_name: "Housekeeper & Cook",
          status: "draft",
          created_at: "2024-07-25T14:30:00Z",
          department: "Housekeeping",
          location: "Singapore",
          description:
            "Need assistance with daily cooking and cleaning for a family of 4.",
        },
        {
          id: 3,
          position_name: "Nanny for Toddler",
          status: "published",
          created_at: "2024-07-29T11:00:00Z",
          department: "Childcare",
          location: "Jurong West, Singapore",
          description: "Experienced nanny needed for a 3-year-old child.",
        },
      ];
      return { success: true, jobs: mockJobs };
    }

    try {
      const orgResponse = await api.get(`/organizations/`, {
        params: { external_id: email },
      });

      if (!orgResponse.data.results?.length) {
        return { success: true, jobs: [], message: "No organization found" };
      }

      const organizationId = orgResponse.data.results[0].id;

      const jobsResponse = await api.get(`/jobs/`, {
        params: { organization_id: organizationId },
      });

      return {
        success: true,
        jobs: jobsResponse.data.results || [],
        organization: orgResponse.data.results[0],
      };
    } catch (error: any) {
      console.error("Fetch jobs error:", error);
      return {
        success: false,
        error: "Network error. Please try again.",
        jobs: [],
      };
    }
  },

  // ========================================================================
  // CREATE JOB
  // ========================================================================
  async createJob(jobData: any, employerEmail: string) {
    if (isMock) {
      console.warn("Manatal API Key missing. Mocking job creation.");
      return { success: true, data: { id: Date.now(), ...jobData } };
    }

    try {
      // Get Org ID
      const orgResponse = await api.get(`/organizations/`, {
        params: { external_id: employerEmail },
      });

      if (!orgResponse.data.results?.length) {
        return {
          success: false,
          error: "Employer organization not found in Manatal.",
        };
      }

      const organizationId = orgResponse.data.results[0].id;

      // Create Job Payload
      const payload = {
        position_name: jobData.title,
        organization: organizationId,
        description: jobData.description,
        salary_min: jobData.salary?.min,
        salary_max: jobData.salary?.max,
        currency: jobData.salary?.currency,
        address: jobData.location,
        status: "published",
      };

      const response = await api.post(`/jobs/`, payload);

      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Create Job Error:", error);
      return {
        success: false,
        error: error.response?.data?.detail || "Failed to create job.",
      };
    }
  },
};
