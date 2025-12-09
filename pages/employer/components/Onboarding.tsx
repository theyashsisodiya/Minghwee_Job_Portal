
import React, { useState } from 'react';
import { Country } from '../../../types';
import { useGlobalState } from '../../../contexts/StateContext';

interface OnboardingData {
    name: string;
    company: string; 
    email: string;
    contact: string;
    // Requirement fields
    role: string;
    budget: string;
    workingHours: string;
    details: string;
}

interface OnboardingProps {
    onOnboardingComplete: (data: OnboardingData) => void;
    country: Country;
}

const Onboarding: React.FC<OnboardingProps> = ({ onOnboardingComplete, country }) => {
    const [step, setStep] = useState(1);
    
    // Unified state for both steps
    const [formData, setFormData] = useState<OnboardingData>({
        name: '',
        company: 'Individual Household',
        email: '',
        contact: '',
        role: 'Domestic Helper', // Default
        budget: '',
        workingHours: '',
        details: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const nextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const submitAll = (e: React.FormEvent) => {
        e.preventDefault();
        onOnboardingComplete(formData);
    };

    const isSingapore = country === Country.Singapore;
    const currency = isSingapore ? 'SGD' : 'PHP';

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome! Let's Get You Started</h1>
                <p className="text-gray-600">Step {step} of 2</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: step === 1 ? '50%' : '100%' }}></div>
                </div>
            </div>

            {step === 1 && (
                <form onSubmit={nextStep}>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Personal Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Full Name</label>
                            <input type="text" id="name" placeholder="Enter your full name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact">Contact Number</label>
                            <input type="tel" id="contact" placeholder="Enter your contact number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required value={formData.contact} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Household Name</label>
                            <input type="text" id="company" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.company} readOnly />
                            <p className="text-xs text-gray-500 mt-1">Default set to Individual Household</p>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                        <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300">
                            Next: Job Requirements
                        </button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={submitAll}>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Job Requirements (Optional)</h2>
                    <p className="text-sm text-gray-500 mb-6">Let our team know what you are looking for. We will review your requirements and post the job for you.</p>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="role">Role Required</label>
                            <select id="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="Domestic Helper">Domestic Helper</option>
                                <option value="Cook">Cook</option>
                                <option value="Nanny">Nanny / Childcare</option>
                                <option value="Elderly Care">Elderly Care</option>
                                <option value="Housekeeper">Housekeeper</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="budget">Monthly Budget ({currency})</label>
                                <input type="text" id="budget" placeholder="e.g. 600 - 800" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.budget} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="workingHours">Preferred Working Hours</label>
                                <input type="text" id="workingHours" placeholder="e.g. 11 hours daily" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.workingHours} onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="details">Additional Details & Duties</label>
                            <textarea id="details" rows={4} placeholder="e.g. I need a cook who works with me for 11 hours. Must be good with kids." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.details} onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                        <button type="button" onClick={() => setStep(1)} className="text-gray-600 font-semibold hover:text-gray-800">
                            Back
                        </button>
                        <button type="submit" className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition duration-300">
                            Complete Setup
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Onboarding;
