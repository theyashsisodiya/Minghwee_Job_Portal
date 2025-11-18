import React from 'react';
import { Country } from '../../../types';
import { JOB_CATEGORIES } from '../../../constants';

interface PostJobFormProps {
    country: Country;
    navigate: (page: 'viewJobs') => void;
    isEditing?: boolean;
}

const PostJobForm: React.FC<PostJobFormProps> = ({ country, navigate, isEditing = false }) => {
    const isSingapore = country === Country.Singapore;
    const currency = isSingapore ? 'SGD' : 'PHP';
    const domesticHelperDuties = ['Childcare', 'Eldercare', 'Cooking', 'General Housekeeping', 'Pet Care'];
    
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                {isEditing ? 'Edit Job' : 'Post a New Job'}
            </h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={(e) => { e.preventDefault(); navigate('viewJobs'); }}>
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Basic Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="jobTitle">Job Title</label>
                                    <input type="text" id="jobTitle" placeholder="Enter job title" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="jobCategory">Job Category</label>
                                    {isSingapore ? (
                                        <select id="jobCategory" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>Domestic Helper</option>
                                            <option>Other</option>
                                        </select>
                                    ) : (
                                        <select id="jobCategory" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>Select a category</option>
                                            {JOB_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                                        </select>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="jobDescription">Job Description</label>
                                    <textarea id="jobDescription" rows={5} placeholder="Describe the responsibilities and requirements..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location">Location</label>
                                    <input type="text" id="location" placeholder="Enter job location" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Schedule & Compensation</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="workingHours">Working Hours</label>
                                    <input type="text" id="workingHours" placeholder="e.g., 9 AM - 6 PM, Shift work" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range (per month)</label>
                                    <div className="flex items-center space-x-4">
                                        <div className="relative flex-1">
                                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">{currency}</span>
                                            <input type="number" placeholder="Minimum" className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <span className="text-gray-500">-</span>
                                        <div className="relative flex-1">
                                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">{currency}</span>
                                            <input type="number" placeholder="Maximum" className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                             <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Candidate Requirements</h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="experience">Years of Experience</label>
                                    <select id="experience" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Select experience level</option>
                                        <option>No experience required</option>
                                        <option>1-2 years</option>
                                        <option>3-5 years</option>
                                        <option>5+ years</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="requiredSkills">Required Skills</label>
                                    <input type="text" id="requiredSkills" placeholder="e.g., Welding, Heavy Lifting" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="md:col-span-2">
                                     <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="physicalReqs">Physical Requirements</label>
                                    <textarea id="physicalReqs" rows={3} placeholder="e.g., Able to lift up to 20kg, able to stand for long hours" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                </div>
                                 <div className="md:col-span-2">
                                     <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="certs">Certifications / Licenses</label>
                                     <input type="text" id="certs" placeholder="e.g., Forklift License, First Aid Certification" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                             </div>
                        </div>
                       
                        {isSingapore && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Domestic Helper Specifics</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Arrangement</label>
                                        <div className="flex items-center space-x-6">
                                            <label className="flex items-center space-x-2 cursor-pointer"><input type="radio" name="arrangement" className="form-radio text-blue-600" /><span>Live-in</span></label>
                                            <label className="flex items-center space-x-2 cursor-pointer"><input type="radio" name="arrangement" className="form-radio text-blue-600" /><span>Live-out</span></label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="restDays">Rest Days per Month</label>
                                        <input type="number" id="restDays" placeholder="e.g., 4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Primary Duties</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {domesticHelperDuties.map(duty => (
                                                <label key={duty} className="flex items-center space-x-2 cursor-pointer">
                                                    <input type="checkbox" className="form-checkbox rounded text-blue-600" />
                                                    <span className="text-gray-700">{duty}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-8 flex justify-end space-x-4">
                         <button type="button" onClick={() => navigate('viewJobs')} className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition duration-300">
                            Cancel
                        </button>
                        <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                            {isEditing ? 'Save Changes' : 'Submit Job'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJobForm;
