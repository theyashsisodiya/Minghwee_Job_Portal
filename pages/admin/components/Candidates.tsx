import React from 'react';
import { MOCK_MANAGED_CANDIDATES, JOB_CATEGORIES } from '../../../constants';
import { AdminPage } from '../AdminDashboard';

interface CandidatesProps {
    navigate: (page: AdminPage) => void;
}

const Candidates: React.FC<CandidatesProps> = ({ navigate }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Candidates Management</h1>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center justify-between">
                <div className="relative w-full max-w-sm">
                    <input type="text" placeholder="Search candidates by name" className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Job Category</option>
                        {JOB_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Applied Job Categories</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Documents</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_MANAGED_CANDIDATES.map(candidate => (
                            <tr key={candidate.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-4 px-4 font-medium text-gray-800">{candidate.name}</td>
                                <td className="py-4 px-4 text-gray-600">{candidate.appliedCategories.join(', ')}</td>
                                <td className="py-4 px-4">
                                    <button onClick={() => navigate('candidateDocuments')} className="text-blue-600 hover:underline text-sm font-medium">View Documents</button>
                                </td>
                                <td className="py-4 px-4">
                                    <button onClick={() => navigate('candidateProfile')} className="text-blue-600 hover:underline text-sm font-medium">View Profile</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Candidates;
