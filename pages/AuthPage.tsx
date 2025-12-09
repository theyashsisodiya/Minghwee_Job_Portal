
import React, { useState } from 'react';
import { Page, UserType, Country } from '../types';

interface AuthPageProps {
  initialCountry: Country | null;
  onAuthSuccess: (userType: UserType, name: string) => void;
  navigateTo: (page: Page, options?: { userType?: UserType }) => void;
  initialUserType?: UserType;
}

const AuthPage: React.FC<AuthPageProps> = ({ initialCountry, onAuthSuccess, navigateTo, initialUserType }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [userType, setUserType] = useState<UserType>(initialUserType || UserType.Candidate);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegisterMode) {
        // Mocking successful registration for a new employer
        onAuthSuccess(UserType.Employer, fullName || 'New Employer');
    } else {
        const isSalesLogin = userType === UserType.Employer &&
                             ((email === 'sale' && otp === 'sale') ||
                              (email === 'yash@gmail.com' && otp === '12345'));
                              
        if (isSalesLogin) {
            onAuthSuccess(UserType.Sales, 'Sales Team');
        } else if (email === '0' && otp === '0') {
            onAuthSuccess(UserType.Admin, 'Admin');
        } else {
            onAuthSuccess(userType, 'John Doe');
        }
    }
  };

  const title = isRegisterMode ? 'Create Employer Account' : 'Welcome Back';
  const buttonText = isRegisterMode ? 'Register' : 'Sign In';

  return (
    <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-800" onClick={() => navigateTo(Page.Home)} style={{cursor: 'pointer'}}>MingHwee</div>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700">{initialCountry ? `Country: ${initialCountry}`: "No Country Selected"}</span>
                </div>
            </nav>
        </header>
        <main className="flex-grow flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                </div>

                {!isRegisterMode && (
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
               
                <form onSubmit={handleAuthSubmit}>
                    {isRegisterMode && (
                         <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="fullName">
                            Full Name
                            </label>
                            <input
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                        Email or Username
                        </label>
                        <input
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="email"
                        type="text"
                        placeholder="Enter your email or username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="otp">
                        Enter OTP / Password
                        </label>
                        <input
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="otp"
                        type="password"
                        placeholder="Enter OTP or Password"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
                    >
                        {buttonText}
                    </button>
                    {!isRegisterMode && initialCountry === Country.Singapore && (
                        <button
                            type="button"
                            className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Sign in with Singpass
                        </button>
                    )}
                </form>
                 <div className="text-center mt-6">
                    <button onClick={() => setIsRegisterMode(!isRegisterMode)} className="text-sm text-blue-600 hover:underline">
                        {isRegisterMode ? "Already have an account? Sign In" : "Don't have an employer account? Register Now"}
                    </button>
                </div>
            </div>
        </main>
    </div>
  );
};

export default AuthPage;
