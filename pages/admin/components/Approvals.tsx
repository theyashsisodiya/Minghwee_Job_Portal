import React, { useState } from 'react';
import { MOCK_EMPLOYER_REGISTRATIONS, MOCK_CANDIDATE_PLACEMENTS } from '../../../constants';
import { PaymentStatus } from '../../../types';

const Approvals: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'employer' | 'candidate'>('employer');

    const PaymentBadge: React.FC<{status: PaymentStatus}> = ({status}) => {
        const base = "px-3 py-1 text-sm font-semibold rounded-full";
        switch(status) {
            case PaymentStatus.Done: return <span className={`${base} bg-green-100 text-green-800`}>Done</span>;
            case PaymentStatus.Pending: return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>;
            default: return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Approvals</h1>

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button 
                        onClick={() => setActiveTab('employer')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'employer' 
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Employer Registrations
                    </button>
                     <button 
                        onClick={() => setActiveTab('candidate')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'candidate' 
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Candidate Selected
                    </button>
                </nav>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                {activeTab === 'employer' ? (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Employer Registrations</h2>
                        <table className="w-full text-left">
                             <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Employer</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Contact</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_EMPLOYER_REGISTRATIONS.map(reg => (
                                    <tr key={reg.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="py-4 px-4 font-medium text-gray-800">{reg.employer}</td>
                                        <td className="py-4 px-4 text-gray-600">{reg.contact}</td>
                                        <td className="py-4 px-4 text-gray-600">{reg.email}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex space-x-2">
                                                <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 text-sm">Approve</button>
                                                <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 text-sm">Reject</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Candidate Placements</h2>
                        <table className="w-full text-left">
                             <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Candidate</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Job Title</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Employer</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Payment</th>
                                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_CANDIDATE_PLACEMENTS.map(placement => (
                                    <tr key={placement.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="py-4 px-4 font-medium text-gray-800">{placement.candidate}</td>
                                        <td className="py-4 px-4 text-gray-600">{placement.jobTitle}</td>
                                        <td className="py-4 px-4 text-gray-600">{placement.employer}</td>
                                        <td className="py-4 px-4"><PaymentBadge status={placement.payment} /></td>
                                        <td className="py-4 px-4">
                                            <div className="flex space-x-2">
                                                <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 text-sm">Approve</button>
                                                <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 text-sm">Reject</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Approvals;
