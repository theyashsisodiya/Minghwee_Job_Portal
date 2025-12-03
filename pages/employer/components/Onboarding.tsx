
import React, { useState } from 'react';
import { Country } from '../../../types';

interface OnboardingData {
    name: string;
    company: string;
    email: string;
    contact: string;
}

interface OnboardingProps {
    onOnboardingComplete: (data: OnboardingData) => void;
    country: Country;
}

const SingaporeOnboardingForm: React.FC<{ onOnboardingComplete: (data: OnboardingData) => void }> = ({ onOnboardingComplete }) => {
  const [formData, setFormData] = useState<OnboardingData>({
      name: '',
      company: '', // Optional for individual employers in SG context, but good to have
      email: '',
      contact: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome! Let's Get You Started</h1>
      <p className="text-gray-600 mb-8">Please provide your details to create your employer profile.</p>
     
      <form onSubmit={(e) => {e.preventDefault(); onOnboardingComplete(formData);}}>
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Basic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contact"
                  placeholder="Enter your contact number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={formData.contact}
                  onChange={handleChange}
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

const DefaultOnboardingForm: React.FC<{ onOnboardingComplete: (data: OnboardingData) => void }> = ({ onOnboardingComplete }) => {
    const [formData, setFormData] = useState<OnboardingData>({
        name: '',
        company: '',
        email: '',
        contact: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome! Let's Get You Started</h1>
        <p className="text-gray-600 mb-8">Please provide your details to create your employer profile. This information will help us verify your account.</p>
       
        <form onSubmit={(e) => {e.preventDefault(); onOnboardingComplete(formData);}}>
            <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Company Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="company">
                    Company Name
                    </label>
                    <input
                    type="text"
                    id="company"
                    placeholder="Enter your company's official name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    value={formData.company}
                    onChange={handleChange}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                    Full Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    value={formData.name}
                    onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact">
                    Contact Number
                    </label>
                    <input
                    type="tel"
                    id="contact"
                    placeholder="Enter your contact number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    value={formData.contact}
                    onChange={handleChange}
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
