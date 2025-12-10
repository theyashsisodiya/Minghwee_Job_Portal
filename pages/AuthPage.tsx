
import React, { useState, useRef } from 'react';
import { Page, UserType, Country } from '../types';
import { manatalApi } from '../services/manatalApi';

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

interface AuthPageProps {
  initialCountry: Country | null;
  onAuthSuccess: (userType: UserType, name: string, email?: string) => void;
  navigateTo: (page: Page, options?: { userType?: UserType }) => void;
  initialUserType?: UserType;
}

const AuthPage: React.FC<AuthPageProps> = ({ initialCountry, onAuthSuccess, navigateTo, initialUserType }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [registerType, setRegisterType] = useState<'employer' | 'candidate'>('employer');
  const [userType, setUserType] = useState<UserType>(initialUserType || UserType.Candidate);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  
  // Extended Employer Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');

  // Extended Candidate Fields
  const [currentPosition, setCurrentPosition] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [currentSalary, setCurrentSalary] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [adminLoginType, setAdminLoginType] = useState<'sales' | 'admin' | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (adminLoginType === 'sales') {
        if ((email === 'sale' && otp === 'sale') || (email === 'yash@gmail.com' && otp === '12345')) {
            onAuthSuccess(UserType.Sales, email === 'yash@gmail.com' ? 'Yash' : 'Sales Team', email);
        } else {
            setErrorMessage('Invalid sales credentials. Please try again.');
            scrollToTop();
        }
        return;
    }

    if (adminLoginType === 'admin') {
        if (email === 'admin' && otp === '0') {
            onAuthSuccess(UserType.Admin, 'Administrator', email);
        } else {
            setErrorMessage('Invalid admin credentials. Please try again.');
            scrollToTop();
        }
        return;
    }

    if (isRegisterMode) {
        setIsLoading(true);
        try {
            if (registerType === 'employer') {
                const result = await manatalApi.registerEmployer({
                    name: companyName,
                    description: companyDescription,
                    address: address,
                    website: companyWebsite,
                    email: email,
                    industry: industry,
                    location: location
                });

                if (result.success) {
                    setSuccessMessage('Registration successful! Your employer account has been created.');
                    setTimeout(() => {
                        onAuthSuccess(UserType.Employer, fullName || 'New Employer', email);
                    }, 1500);
                } else {
                    setErrorMessage(result.error || 'Registration failed. Please try again.');
                    scrollToTop();
                }
            } else {
                const result = await manatalApi.registerCandidate({
                    full_name: fullName,
                    email: email,
                    phone: phone,
                    address: address,
                    current_position: currentPosition,
                    current_company: currentCompany,
                    notice_period: noticePeriod,
                    current_salary: currentSalary,
                    expected_salary: expectedSalary
                });

                if (result.success) {
                    setSuccessMessage('Registration successful! Your candidate account has been created.');
                    setTimeout(() => {
                        onAuthSuccess(UserType.Candidate, fullName || 'New Candidate', email);
                    }, 1500);
                } else {
                    setErrorMessage(result.error || 'Registration failed. Please try again.');
                    scrollToTop();
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('Unable to connect. Please try again later.');
            scrollToTop();
        } finally {
            setIsLoading(false);
        }
    } else {
        setIsLoading(true);
        try {
            const result = await manatalApi.loginUser(
                email,
                userType === UserType.Candidate ? 'candidate' : 'employer'
            );

            if (result.success && result.user) {
                onAuthSuccess(userType, result.user.name, email);
            } else {
                setErrorMessage(result.error || 'Login failed. Please check your credentials.');
                scrollToTop();
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Unable to connect. Please try again later.');
            scrollToTop();
        } finally {
            setIsLoading(false);
        }
    }
  };

  const getTitle = () => {
    if (adminLoginType === 'sales') return 'Sales Team Login';
    if (adminLoginType === 'admin') return 'Admin Login';
    if (!isRegisterMode) return 'Welcome Back';
    return registerType === 'employer' ? 'Create Employer Account' : 'Create Candidate Account';
  };

  const buttonText = isRegisterMode 
    ? (isLoading ? 'Registering...' : 'Register') 
    : (isLoading ? 'Signing In...' : 'Sign In');

  return (
    <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <img 
                  src="https://ik.imagekit.io/ui4mpbzoy/removed-background.png?updatedAt=1764657414508"
                  alt="MingHwee Logo" 
                  className="h-12 w-auto object-contain cursor-pointer" 
                  onClick={() => navigateTo(Page.Home)}
                />
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700">{initialCountry ? `Country: ${initialCountry}`: "No Country Selected"}</span>
                    <div className="relative">
                        <button
                            onClick={() => setShowAdminMenu(!showAdminMenu)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                            title="Staff Login"
                        >
                            <SettingsIcon />
                        </button>
                        {showAdminMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <button
                                    onClick={() => {
                                        setAdminLoginType('sales');
                                        setShowAdminMenu(false);
                                        setIsRegisterMode(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 ${adminLoginType === 'sales' ? 'bg-blue-50 text-blue-600' : ''}`}
                                >
                                    Login as Sales
                                </button>
                                <button
                                    onClick={() => {
                                        setAdminLoginType('admin');
                                        setShowAdminMenu(false);
                                        setIsRegisterMode(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 ${adminLoginType === 'admin' ? 'bg-blue-50 text-blue-600' : ''}`}
                                >
                                    Login as Admin
                                </button>
                                {adminLoginType && (
                                    <button
                                        onClick={() => {
                                            setAdminLoginType(null);
                                            setShowAdminMenu(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-500 border-t border-gray-100 mt-1"
                                    >
                                        Back to Normal Login
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
        <main className="flex-grow flex items-center justify-center bg-gray-50 p-6">
            <div ref={formRef} className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">{getTitle()}</h1>
                </div>

                {!isRegisterMode && !adminLoginType && (
                    <div className="mb-6 p-1 bg-gray-200 rounded-lg flex">
                        <button
                        onClick={() => setUserType(UserType.Candidate)}
                        className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${userType === UserType.Candidate ? 'bg-white shadow' : 'text-gray-500'}`}
                        >
                        Sign in as Candidate
                        </button>
                        <button
                        onClick={() => setUserType(UserType.Employer)}
                        className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${userType === UserType.Employer ? 'bg-white shadow' : 'text-gray-500'}`}
                        >
                        Sign in as Employer
                        </button>
                    </div>
                )}
                
                {adminLoginType && (
                    <div className="mb-6 text-center">
                        <p className="text-gray-600 text-sm">
                            {adminLoginType === 'sales' 
                                ? 'Enter your sales team credentials to access client management and job posting features.' 
                                : 'Enter your admin credentials to access the administration panel.'}
                        </p>
                    </div>
                )}

                {isRegisterMode && (
                    <div className="mb-6 p-1 bg-gray-200 rounded-lg flex">
                        <button
                        type="button"
                        onClick={() => setRegisterType('candidate')}
                        className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${registerType === 'candidate' ? 'bg-white shadow' : 'text-gray-500'}`}
                        >
                        Candidate
                        </button>
                        <button
                        type="button"
                        onClick={() => setRegisterType('employer')}
                        className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${registerType === 'employer' ? 'bg-white shadow' : 'text-gray-500'}`}
                        >
                        Employer
                        </button>
                    </div>
                )}
               
                <form onSubmit={handleAuthSubmit}>
                    {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {errorMessage}
                    </div>
                    )}
                    {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        {successMessage}
                    </div>
                    )}

                    {isRegisterMode && registerType === 'employer' && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="fullName">Full Name <span className="text-red-500">*</span></label>
                                <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="fullName" type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="companyName">Company / Household Name <span className="text-red-500">*</span></label>
                                <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="companyName" type="text" placeholder="Enter name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="industry">Industry</label>
                                <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="industry" type="text" placeholder="e.g. Technology, Household" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="location">Location</label>
                                <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="location" type="text" placeholder="City, Country" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">Full Address</label>
                                <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="address" type="text" placeholder="Enter full address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="companyWebsite">Website (Optional)</label>
                                <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="companyWebsite" type="url" placeholder="https://www.example.com" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="companyDescription">Description</label>
                                <textarea className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="companyDescription" placeholder="Brief description" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} rows={3} />
                            </div>
                        </>
                    )}

                    {isRegisterMode && registerType === 'candidate' && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="fullName">Full Name <span className="text-red-500">*</span></label>
                                <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="fullName" type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">Phone Number</label>
                                <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="phone" type="tel" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="candidateAddress">Location / Address</label>
                                <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="candidateAddress" type="text" placeholder="City, Country" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="currentPosition">Current Position</label>
                                <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="currentPosition" type="text" placeholder="e.g. Helper, Cook" value={currentPosition} onChange={(e) => setCurrentPosition(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="currentCompany">Current Company</label>
                                <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="currentCompany" type="text" placeholder="Employer Name" value={currentCompany} onChange={(e) => setCurrentCompany(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="currentSalary">Current Salary</label>
                                    <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="currentSalary" type="text" placeholder="e.g. 600" value={currentSalary} onChange={(e) => setCurrentSalary(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="expectedSalary">Expected Salary</label>
                                    <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="expectedSalary" type="text" placeholder="e.g. 800" value={expectedSalary} onChange={(e) => setExpectedSalary(e.target.value)} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="noticePeriod">Notice Period</label>
                                <input className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="noticePeriod" type="text" placeholder="e.g. 1 Month, Immediate" value={noticePeriod} onChange={(e) => setNoticePeriod(e.target.value)} />
                            </div>
                        </>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                        {adminLoginType ? 'Username' : 'Email'} {isRegisterMode && <span className="text-red-500">*</span>}
                        </label>
                        <input
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="email"
                        type={isRegisterMode ? "email" : "text"}
                        placeholder={adminLoginType ? "Enter your username" : "Enter your email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="otp">
                        {adminLoginType ? 'Password' : 'Enter OTP'} {isRegisterMode && <span className="text-red-500">*</span>}
                        </label>
                        <input
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="otp"
                        type="password"
                        placeholder={adminLoginType ? "Enter your password" : "Enter OTP"}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 mb-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                        {buttonText}
                    </button>
                    {!isRegisterMode && !adminLoginType && initialCountry === Country.Singapore && (
                        <button
                            type="button"
                            className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Sign in with Singpass
                        </button>
                    )}
                </form>
                {!adminLoginType && (
                    <div className="text-center mt-6">
                        <button onClick={() => setIsRegisterMode(!isRegisterMode)} className="text-sm text-blue-600 hover:underline">
                            {isRegisterMode ? "Already have an account? Sign In" : "Don't have an account? Register Now"}
                        </button>
                    </div>
                )}
                {adminLoginType && (
                    <div className="text-center mt-6">
                        <button 
                            onClick={() => {
                                setAdminLoginType(null);
                                setShowAdminMenu(false);
                            }}
                            className="text-sm text-gray-500 hover:underline"
                        >
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
