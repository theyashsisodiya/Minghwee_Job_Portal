import React from 'react';
import { MOCK_CANDIDATE_PROFILE } from '../../../constants';
import { AdminPage } from '../AdminDashboard';

interface CandidateProfileProps {
    navigate: (page: AdminPage) => void;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({ navigate }) => {
    const candidate = MOCK_CANDIDATE_PROFILE;

    const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium text-gray-800">{value}</p>
        </div>
    );

    return (
        <div>
            <div className="mb-6">
                <button onClick={() => navigate('candidates')} className="text-blue-600 hover:underline font-semibold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Candidates
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-start space-x-8 pb-8 border-b">
                    <img src={candidate.avatarUrl} alt={candidate.name} className="w-24 h-24 rounded-full" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{candidate.name}</h1>
                        <p className="text-xl text-gray-600">{candidate.role}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
                        <div className="space-y-4">
                            <InfoItem label="Full Name" value={candidate.personalInfo.fullName} />
                            <InfoItem label="Email Address" value={candidate.personalInfo.email} />
                            <InfoItem label="Phone Number" value={candidate.personalInfo.phone} />
                            <InfoItem label="Location" value={candidate.personalInfo.location} />
                            <InfoItem label="Gender" value={candidate.personalInfo.gender} />
                            <InfoItem label="Date of Birth" value={candidate.personalInfo.dob} />
                        </div>
                    </div>
                     <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Skills & Categories</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.skills.map(skill => (
                                        <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 text-sm font-semibold rounded-full">{skill}</span>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Job Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.jobCategories.map(cat => (
                                        <span key={cat} className="bg-gray-200 text-gray-800 px-3 py-1 text-sm font-semibold rounded-full">{cat}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="mt-8 pt-8 border-t">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Process History</h2>
                    <ul className="space-y-3">
                        {candidate.processHistory.map((item, index) => (
                             <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div>
                                    <p className="font-medium text-gray-800">{item.jobTitle} at {item.company}</p>
                                    <p className="text-sm text-gray-500">Date: {item.date}</p>
                                </div>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                    item.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                                    item.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>{item.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CandidateProfile;
