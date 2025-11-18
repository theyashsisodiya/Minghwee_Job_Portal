
import React from 'react';
import { Country } from '../../../types';

interface OnboardingProps {
    onOnboardingComplete: () => void;
    country: Country;
}

const SingaporeOnboardingForm: React.FC<{ onOnboardingComplete: () => void }> = ({ onOnboardingComplete }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome! Let's Get You Started</h1>
      <p className="text-gray-600 mb-8">Please provide your details to create your employer profile.</p>
     
      <form onSubmit={(e) => {e.preventDefault(); onOnboardingComplete();}}>
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Basic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                  Your Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contactNumber">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  placeholder="Enter your contact number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
       
        <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Complete Setup
            </button>
        </div>
      </form>
    </div>
  );
};

const DefaultOnboardingForm: React.FC<{ onOnboardingComplete: () => void }> = ({ onOnboardingComplete }) => {
    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome! Let's Get You Started</h1>
        <p className="text-gray-600 mb-8">Please provide your details to create your employer profile. This information will help us verify your account.</p>
       
        <form onSubmit={(e) => {e.preventDefault(); onOnboardingComplete();}}>
            <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Company Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="companyName">
                    Company Name
                    </label>
                    <input
                    type="text"
                    id="companyName"
                    placeholder="Enter your company's official name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div>
               
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="registrationNumber">
                    Business Registration Number
                    </label>
                    <input
                    type="text"
                    id="registrationNumber"
                    placeholder="e.g., UEN for Singapore"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div>
                </div>
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Your Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                    Full Name
                    </label>
                    <input
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email Address
                    </label>
                    <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contactNumber">
                    Contact Number
                    </label>
                    <input
                    type="tel"
                    id="contactNumber"
                    placeholder="Enter your contact number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dob">
                    Date of Birth
                    </label>
                    <input
                    type="date"
                    id="dob"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div>
                </div>
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Required Documents</h2>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="docUpload">
                    Upload MOM / Business Documents
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="mb-2 text-gray-500">Drag & drop your files here or click to browse.</p>
                    <input type="file" id="docUpload" className="hidden" multiple />
                    <label htmlFor="docUpload" className="mt-2 inline-block cursor-pointer bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                    Select Files
                    </label>
                </div>
                </div>
            </div>
            </div>
           
            <div className="mt-8 flex justify-end">
                <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                Complete Setup
                </button>
            </div>
        </form>
        </div>
    );
};

const Onboarding: React.FC<OnboardingProps> = ({ onOnboardingComplete, country }) => {
  if (country === Country.Singapore) {
    return <SingaporeOnboardingForm onOnboardingComplete={onOnboardingComplete} />;
  }
 
  return <DefaultOnboardingForm onOnboardingComplete={onOnboardingComplete} />;
};

export default Onboarding;
