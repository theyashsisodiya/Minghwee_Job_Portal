
// Check multiple sources for the API key to be robust against different naming conventions
const MANATAL_API_KEY = (import.meta as any).env?.VITE_MANATAL_API_KEY || process.env.MANATAL_API_KEY;
const MANATAL_BASE_URL = 'https://api.manatal.com/open/v3';

const getHeaders = () => ({
  'Authorization': `Token ${MANATAL_API_KEY}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

export const manatalApi = {
  async registerEmployer(data: {
    name: string;
    description?: string;
    address?: string;
    website?: string;
    email?: string;
    industry?: string;
    location?: string;
  }) {
    if (!MANATAL_API_KEY) {
      // Allow mock registration if no key for demo purposes
      console.warn('Manatal API Key missing. Returning mock success. Check your .env file and restart the server.');
      return { success: true, data: { id: Date.now(), ...data } };
    }

    try {
      if (data.email) {
        const checkResponse = await fetch(
          `${MANATAL_BASE_URL}/organizations/?external_id=${encodeURIComponent(data.email)}`,
          { method: 'GET', headers: getHeaders() }
        );
        const checkData = await checkResponse.json();
        
        if (checkResponse.ok && checkData.results?.length > 0) {
          return { success: false, error: 'An employer with this email already exists', existing: true };
        }
      }

      // Combine extra fields into description for visibility on Manatal
      const detailedDescription = `
${data.description || ''}

--- Registration Details ---
Email: ${data.email}
Industry: ${data.industry || 'N/A'}
Location: ${data.location || 'N/A'}
Address: ${data.address || 'N/A'}
      `.trim();

      const response = await fetch(`${MANATAL_BASE_URL}/organizations/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          name: data.name,
          description: detailedDescription,
          address: data.address || data.location || '',
          website: data.website || '',
          industry: data.industry || '', // Maps if standard field exists
          external_id: data.email || null,
        })
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.detail || result.message || 'Failed to create organization' };
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  async registerCandidate(data: {
    full_name: string;
    email?: string;
    phone?: string;
    address?: string;
    current_position?: string;
    current_company?: string;
    notice_period?: string;
    current_salary?: string;
    expected_salary?: string;
  }) {
    if (!MANATAL_API_KEY) {
        console.warn('Manatal API Key missing. Returning mock success.');
        return { success: true, data: { id: Date.now(), ...data } };
    }

    try {
      if (data.email) {
        const checkResponse = await fetch(
          `${MANATAL_BASE_URL}/candidates/?email=${encodeURIComponent(data.email)}`,
          { method: 'GET', headers: getHeaders() }
        );
        const checkData = await checkResponse.json();
        
        if (checkResponse.ok && checkData.results?.length > 0) {
          return { success: false, error: 'A candidate with this email already exists', existing: true };
        }
      }

      // Format extended fields into the description so they appear on the candidate profile
      const detailedDescription = `
--- Professional Details ---
Current Position: ${data.current_position || 'N/A'}
Current Company: ${data.current_company || 'N/A'}
Notice Period: ${data.notice_period || 'N/A'}
Current Salary: ${data.current_salary || 'N/A'}
Expected Salary: ${data.expected_salary || 'N/A'}
      `.trim();

      const response = await fetch(`${MANATAL_BASE_URL}/candidates/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          full_name: data.full_name,
          email: data.email || '',
          phone_number: data.phone || '',
          address: data.address || '',
          description: detailedDescription,
          position: data.current_position || '', // Try mapping to standard field
          external_id: data.email || null
        })
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.detail || result.message || 'Failed to create candidate' };
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  async loginUser(email: string, userType: 'candidate' | 'employer') {
    if (!MANATAL_API_KEY) {
        // Mock Login for demo if no key
        if (email === 'admin' || email === 'demo') return { success: false, error: 'Please use Admin Login for these credentials' };
        return { success: true, user: { name: 'Demo User', email, id: 999 } };
    }

    try {
      if (userType === 'candidate') {
        const response = await fetch(
          `${MANATAL_BASE_URL}/candidates/?email=${encodeURIComponent(email)}`,
          { method: 'GET', headers: getHeaders() }
        );
        const data = await response.json();
        
        if (response.ok && data.results?.length > 0) {
          const candidate = data.results[0];
          return { success: true, user: { name: candidate.full_name, email: candidate.email, id: candidate.id } };
        }
        return { success: false, error: 'No account found with this email. Please register first.' };
      } else {
        const response = await fetch(
          `${MANATAL_BASE_URL}/organizations/?external_id=${encodeURIComponent(email)}`,
          { method: 'GET', headers: getHeaders() }
        );
        const data = await response.json();
        
        if (response.ok && data.results?.length > 0) {
          const org = data.results[0];
          return { success: true, user: { name: org.name, email: email, id: org.id } };
        }
        return { success: false, error: 'No account found with this email. Please register first.' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  async getEmployerJobs(email: string) {
    if (!MANATAL_API_KEY) {
      console.warn('Manatal API Key missing. Returning mock jobs.');
      // Return mock data compatible with the expected structure
      const mockJobs = [
        {
            id: 1,
            position_name: 'Domestic Helper for Elderly Care',
            status: 'published',
            created_at: '2024-07-28T09:00:00Z',
            department: 'Elderly Care',
            location: 'Singapore',
            description: 'Looking for a patient helper to assist with elderly care and general housekeeping.'
        },
        {
            id: 2,
            position_name: 'Housekeeper & Cook',
            status: 'draft',
            created_at: '2024-07-25T14:30:00Z',
            department: 'Housekeeping',
            location: 'Singapore',
            description: 'Need assistance with daily cooking and cleaning for a family of 4.'
        },
        {
            id: 3,
            position_name: 'Nanny for Toddler',
            status: 'published',
            created_at: '2024-07-29T11:00:00Z',
            department: 'Childcare',
            location: 'Jurong West, Singapore',
            description: 'Experienced nanny needed for a 3-year-old child.'
        }
      ];
      return { success: true, jobs: mockJobs };
    }

    try {
      const orgResponse = await fetch(
        `${MANATAL_BASE_URL}/organizations/?external_id=${encodeURIComponent(email)}`,
        { method: 'GET', headers: getHeaders() }
      );
      const orgData = await orgResponse.json();

      if (!orgResponse.ok || !orgData.results?.length) {
        return { success: true, jobs: [], message: 'No organization found' };
      }

      const organizationId = orgData.results[0].id;
      const jobsResponse = await fetch(
        `${MANATAL_BASE_URL}/jobs/?organization_id=${organizationId}`,
        { method: 'GET', headers: getHeaders() }
      );
      const jobsData = await jobsResponse.json();

      if (!jobsResponse.ok) {
        return { success: false, error: 'Failed to fetch jobs', jobs: [] };
      }

      return { success: true, jobs: jobsData.results || [], organization: orgData.results[0] };
    } catch (error) {
      console.error('Fetch jobs error:', error);
      return { success: false, error: 'Network error. Please try again.', jobs: [] };
    }
  },

  async createJob(jobData: any, employerEmail: string) {
    if (!MANATAL_API_KEY) {
        console.warn('Manatal API Key missing. Mocking job creation.');
        return { success: true, data: { id: Date.now(), ...jobData } };
    }

    try {
        // 1. Get Organization ID
        const orgResponse = await fetch(
            `${MANATAL_BASE_URL}/organizations/?external_id=${encodeURIComponent(employerEmail)}`,
            { method: 'GET', headers: getHeaders() }
        );
        const orgData = await orgResponse.json();

        if (!orgResponse.ok || !orgData.results?.length) {
            return { success: false, error: 'Employer organization not found in Manatal.' };
        }

        const organizationId = orgData.results[0].id;

        // 2. Create Job
        const payload = {
            position_name: jobData.title,
            organization: organizationId,
            description: jobData.description,
            salary_min: jobData.salary?.min,
            salary_max: jobData.salary?.max,
            currency: jobData.salary?.currency,
            address: jobData.location,
            status: 'published' // or 'draft'
        };

        const response = await fetch(`${MANATAL_BASE_URL}/jobs/`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, error: result.detail || 'Failed to create job.' };
        }

        return { success: true, data: result };

    } catch (error) {
        console.error('Create Job Error:', error);
        return { success: false, error: 'Network error.' };
    }
  }
};
