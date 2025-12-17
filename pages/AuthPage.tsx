
import React, { useState, useRef, useEffect } from "react";
import { UserType, Country } from "../types";
import { manatalApi } from "../services/manatalApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { AIRTABLE_CONFIG } from "../services/airtable";
import { Navbar } from "../components/Navbar";

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

interface AuthPageProps {
  initialCountry: Country | null;
  onAuthSuccess: (userType: UserType, name: string, email?: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ initialCountry, onAuthSuccess }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialUserType = searchParams.get("type") === "employer" ? UserType.Employer : UserType.Candidate;

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [registerType, setRegisterType] = useState<"employer" | "candidate">("employer");
  const [userType, setUserType] = useState<UserType>(initialUserType);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState(""); // Only for admin/sales


  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [adminLoginType, setAdminLoginType] = useState<"sales" | "admin" | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam === "employer") setUserType(UserType.Employer);
    else if (typeParam === "candidate") setUserType(UserType.Candidate);
  }, [searchParams]);

  useEffect(() => {
    // clear OTP on reload
    localStorage.clear();
    setOtp("");
    setIsOtpSent(false);
  }, []);

  const scrollToTop = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Helper for OTP validation
  const validateOtp = (): boolean => {
    const savedOtp = localStorage.getItem(`otp_${email}`);
    const otpExpiry = localStorage.getItem(`otp_expiry_${email}`);
    if (!savedOtp || !otpExpiry) {
      setErrorMessage("Please request an OTP first.");
      scrollToTop();
      return false;
    }
    if (new Date().getTime() > parseInt(otpExpiry)) {
      setErrorMessage("OTP has expired. Please request a new one.");
      localStorage.removeItem(`otp_${email}`);
      localStorage.removeItem(`otp_expiry_${email}`);
      scrollToTop();
      return false;
    }
    if (otp !== savedOtp) {
      setErrorMessage("Invalid OTP. Please check your email.");
      scrollToTop();
      return false;
    }
    return true;
  };

  const sendOtpEmail = async () => {
    if (!email) {
      setErrorMessage("Please enter your email first.");
      scrollToTop();
      return;
    }
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem(`otp_${email}`, generatedOtp);
    localStorage.setItem(`otp_expiry_${email}`, (new Date().getTime() + 10 * 60 * 1000).toString());
    try {
      // In production, use emailjs. For demo, we alert the OTP.
      // await emailjs.send("service_mm09qfo", "template_rq3gcrc", { email, otp: generatedOtp }, "0dMzgR_KeahvrOFIR");
      
      // DEMO ONLY: Alert the OTP
      alert(`DEMO MODE: Your OTP is ${generatedOtp}`);
      console.log(`DEMO OTP for ${email}: ${generatedOtp}`);

      setSuccessMessage(`OTP sent to ${email}. (Check alert/console for Demo)`);
      setIsOtpSent(true);
      scrollToTop();
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMessage("Failed to send OTP. Please try again.");
      scrollToTop();
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // ---------- Register / Login Flow ----------
    if (!isOtpSent) {
      await sendOtpEmail();
      return;
    }

    if (!validateOtp()) return;

    setIsLoading(true);
    try {
      if (isRegisterMode) {
        if (registerType === "employer") {
          const result = await manatalApi.registerEmployer({
              email,
              full_name: name
          });
          if (result.success) {
            setSuccessMessage("Registration successful! Your employer account has been created.");
            localStorage.removeItem(`otp_${email}`);
            setTimeout(() => onAuthSuccess(UserType.Employer, name || 'Employer', email), 1500);
          } else {
            setErrorMessage(result.error || "Registration failed. Please try again.");
            scrollToTop();
          }
        } else {
          const result = await manatalApi.registerCandidate({
            email,
            full_name: name
          });
          if (result.success) {
            setSuccessMessage("Registration successful! Your candidate account has been created.");
            localStorage.removeItem(`otp_${email}`);
            setTimeout(() => onAuthSuccess(UserType.Candidate, name || 'Candidate', email), 1500);
          } else {
            setErrorMessage(result.error || "Registration failed. Please try again.");
            scrollToTop();
          }
        }
      } else {
        const result = await manatalApi.loginUser(email, userType === UserType.Candidate ? "candidate" : "employer");
        if (result.success && result.user) {
          localStorage.removeItem(`otp_${email}`);
          onAuthSuccess(userType, result.user.name, email);
        } else {
          setErrorMessage(result.error || "Login failed. Please check your credentials.");
          scrollToTop();
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      setErrorMessage("Unable to connect. Please try again later.");
      scrollToTop();
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    if (adminLoginType === "sales") return "Sales Team Login";
    if (adminLoginType === "admin") return "Admin Login";
    if (!isRegisterMode) return "Welcome Back";
    return registerType === "employer" ? "Create Employer Account" : "Create Candidate Account";
  };

  const buttonText = isRegisterMode ? (isLoading ? "Registering..." : "Register") : isLoading ? "Signing In..." : "Sign In";


  
const AdminSignIn = async () => {
    if (!adminLoginType) return;

    setIsLoading(true);
    setErrorMessage("");

    // --- DEMO FALLBACK CREDENTIALS ---
    // If Airtable is not configured or fails, these will allow entry.
    const checkDemoCredentials = () => {
        if (adminLoginType === 'admin' && email === 'admin@minghwee.com' && password === 'password123') {
            onAuthSuccess(UserType.Admin, 'Administrator', email);
            return true;
        }
        if (adminLoginType === 'sales' && email === 'alice.tan@minghwee.com' && password === 'password123') {
            onAuthSuccess(UserType.Sales, 'Alice Tan', email);
            return true;
        }
        return false;
    };

    try {
      // If no API key, go straight to demo check
      if (!AIRTABLE_CONFIG.apiKey) {
          if (checkDemoCredentials()) return;
          throw new Error("No API Configuration");
      }

      const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${AIRTABLE_CONFIG.tables.Users.id}`;
      const filter = `AND({Email}="${email}", {Password}="${password}", {Role}="${adminLoginType}", {Status}="Active")`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${AIRTABLE_CONFIG.apiKey}`,
        },
        params: {
          filterByFormula: filter,
          maxRecords: 1,
        },
      });

      const records = response.data.records;

      if (!records || records.length === 0) {
        // Try fallback before showing error
        if (checkDemoCredentials()) return;

        setErrorMessage(`Invalid ${adminLoginType} credentials. Please try again.`);
        scrollToTop();
        setIsLoading(false);
        return;
      }

      const user = records[0].fields;
      const name = user.Name || (adminLoginType === "sales" ? "Sales Team" : "Administrator");

      // Trigger login success
      onAuthSuccess(
        adminLoginType === "sales" ? UserType.Sales : UserType.Admin,
        name,
        user.Email
      );
    } catch (err) {
      console.error("Login check failed, attempting demo fallback:", err);
      // Fallback for when Airtable call fails but credentials match mock
      if (checkDemoCredentials()) {
          return;
      }
      setErrorMessage("Unable to login. Invalid credentials or network error.");
    } finally {
      setIsLoading(false);
    }
  };

  const AdminLoginButton = (
    <div className="relative">
      <button onClick={() => setShowAdminMenu(!showAdminMenu)} className="p-2 rounded-full hover:bg-white/50 transition-colors text-brand-burgundy" title="Staff Login">
        <SettingsIcon />
      </button>
      {showAdminMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in zoom-in-95">
          <button onClick={() => { setAdminLoginType("sales"); setShowAdminMenu(false); setIsRegisterMode(false); }} className={`w-full text-left px-4 py-2 hover:bg-brand-beige text-brand-burgundy ${adminLoginType === "sales" ? "bg-brand-beige text-brand-terracotta" : ""}`}>Login as Sales</button>
          <button onClick={() => { setAdminLoginType("admin"); setShowAdminMenu(false); setIsRegisterMode(false); }} className={`w-full text-left px-4 py-2 hover:bg-brand-beige text-brand-burgundy ${adminLoginType === "admin" ? "bg-brand-beige text-brand-terracotta" : ""}`}>Login as Admin</button>
          {adminLoginType && <button onClick={() => { setAdminLoginType(null); setShowAdminMenu(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-500 border-t border-gray-100 mt-1">Back to Normal Login</button>}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream font-sans">
      {/* Reused Navbar with Admin Actions injected */}
      <Navbar 
        hideCta={true} 
        extraActions={
            <div className="flex items-center gap-4">
                <span className="text-gray-600 hidden md:inline text-sm font-medium">{initialCountry ? `Country: ${initialCountry}` : ""}</span>
                {AdminLoginButton}
            </div>
        } 
      />

      {/* Main Form - Added pt-32 for fixed navbar offset */}
      <main className="flex-grow flex items-center justify-center bg-brand-cream p-6 relative overflow-hidden pt-32">
        {/* Ambient Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-honey/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-terracotta/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div ref={formRef} className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8 relative z-10 border border-brand-beige">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-burgundy font-serif">{getTitle()}</h1>
          </div>
          {/* Toggle Buttons */}
          {!isRegisterMode && !adminLoginType && (
            <div className="mb-6 p-1 bg-brand-beige rounded-xl flex">
              <button onClick={() => setUserType(UserType.Candidate)} className={`w-1/2 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${userType === UserType.Candidate ? "bg-white shadow text-brand-terracotta" : "text-gray-500 hover:text-brand-burgundy"}`}>Sign in as Candidate</button>
              <button onClick={() => setUserType(UserType.Employer)} className={`w-1/2 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${userType === UserType.Employer ? "bg-white shadow text-brand-terracotta" : "text-gray-500 hover:text-brand-burgundy"}`}>Sign in as Employer</button>
            </div>
          )}
          {isRegisterMode && (
            <div className="mb-6 p-1 bg-brand-beige rounded-xl flex">
              <button type="button" onClick={() => setRegisterType("candidate")} className={`w-1/2 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${registerType === "candidate" ? "bg-white shadow text-brand-terracotta" : "text-gray-500 hover:text-brand-burgundy"}`}>Candidate</button>
              <button type="button" onClick={() => setRegisterType("employer")} className={`w-1/2 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${registerType === "employer" ? "bg-white shadow text-brand-terracotta" : "text-gray-500 hover:text-brand-burgundy"}`}>Employer</button>
            </div>
          )}

          <form onSubmit={handleAuthSubmit}>
            {errorMessage && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{errorMessage}</div>}
            {successMessage && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{successMessage}</div>}
            
            <div className="mb-4">
              <label className="block text-brand-burgundy text-sm font-bold mb-2" htmlFor="email">
                Email {isRegisterMode && <span className="text-brand-terracotta">*</span>}
              </label>
              <input className="w-full px-4 py-3 border border-gray-300 rounded-xl text-brand-burgundy focus:outline-none focus:ring-2 focus:ring-brand-honey/50 focus:border-brand-honey transition-all bg-brand-cream" id="email" type={isRegisterMode ? "email" : "text"} placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            {
                isRegisterMode && (
                    <div className="mb-4">
                      <label className="block text-brand-burgundy text-sm font-bold mb-2" htmlFor="name">
                        Full Name <span className="text-brand-terracotta">*</span>
                        </label>
                        <input className="w-full px-4 py-3 border border-gray-300 rounded-xl text-brand-burgundy focus:outline-none focus:ring-2 focus:ring-brand-honey/50 focus:border-brand-honey transition-all bg-brand-cream" id="name" type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                )
            }
            {
                adminLoginType && (
                    <div className="mb-4">
                      <label className="block text-brand-burgundy text-sm font-bold mb-2" htmlFor="Password">
                        Password <span className="text-brand-terracotta">*</span>
                        </label>
                        <input className="w-full px-4 py-3 border border-gray-300 rounded-xl text-brand-burgundy focus:outline-none focus:ring-2 focus:ring-brand-honey/50 focus:border-brand-honey transition-all bg-brand-cream" id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                )
            }

            {!isOtpSent && !adminLoginType && <button type="button" onClick={sendOtpEmail} className="w-full mb-4 bg-brand-terracotta text-white font-bold py-3 rounded-xl hover:bg-brand-coral transition-colors shadow-lg shadow-brand-terracotta/20">Send OTP</button>}
            {adminLoginType && <button type="button" onClick={AdminSignIn}  className="w-full mb-4 bg-brand-burgundy text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg">Sign In</button>}

            {isOtpSent && (
              <>
                <div className="mb-6">
                  <label className="block text-brand-burgundy text-sm font-bold mb-2" htmlFor="otp">Enter OTP {isRegisterMode && <span className="text-brand-terracotta">*</span>}</label>
                  <input className="w-full px-4 py-3 border border-gray-300 rounded-xl text-brand-burgundy focus:outline-none focus:ring-2 focus:ring-brand-honey/50 focus:border-brand-honey transition-all bg-brand-cream" id="otp" type="number" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                </div>
                <button type="submit" disabled={isLoading} className={`w-full bg-brand-terracotta text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 mb-4 shadow-lg shadow-brand-terracotta/20 ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-brand-coral hover:-translate-y-0.5"}`}>{buttonText}</button>
              </>
            )}
          </form>

          {!adminLoginType && (
            <div className="text-center mt-6">
              <button onClick={() => setIsRegisterMode(!isRegisterMode)} className="text-sm text-brand-burgundy hover:text-brand-terracotta font-medium hover:underline transition-colors">
                {isRegisterMode ? "Already have an account? Sign In" : "Don't have an account? Register Now"}
              </button>
            </div>
          )}

          {adminLoginType && (
            <div className="text-center mt-6">
              <button onClick={() => { setAdminLoginType(null); setShowAdminMenu(false); }} className="text-sm text-gray-500 hover:text-brand-burgundy hover:underline transition-colors">
                Back to regular login
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
