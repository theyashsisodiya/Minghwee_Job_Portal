
import React, { useState } from 'react';
import { MOCK_EMPLOYER_REGISTRATIONS, MOCK_CANDIDATE_PLACEMENTS } from '../../../constants';
import { PaymentStatus } from '../../../types';

const Approvals: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'employer' | 'candidate'>('employer');
    
    // Local state to simulate functional approvals
    const [registrations, setRegistrations] = useState(MOCK_EMPLOYER_REGISTRATIONS);
    const [placements, setPlacements] = useState(MOCK_CANDIDATE_PLACEMENTS);

    const handleApproveRegistration = (id: number) => {
        if(window.confirm('Approve this employer registration?')) {
            setRegistrations(prev => prev.filter(reg => reg.id !== id));
            alert("Employer Registration Approved!");
            // In a real app, this would trigger an API call to update status to 'Approved'
        }
    };

    const handleRejectRegistration = (id: number) => {
        if(window.confirm('Reject this employer registration?')) {
            setRegistrations(prev => prev.filter(reg => reg.id !== id));
            alert("Employer Registration Rejected.");
        }
    };

    const handleApprovePlacement = (id: number) => {
        if(window.confirm('Approve this candidate placement?')) {
            setPlacements(prev => prev.filter(p => p.id !== id));
            alert("Placement Approved Successfully!");
        }
    };

    const handleRejectPlacement = (id: number) => {
        if(window.confirm('Reject this candidate placement?')) {
            setPlacements(prev => prev.filter(p => p.id !== id));
            alert("Placement Rejected.");
        }
    };

    const PaymentBadge: React.FC<{status: PaymentStatus}> = ({status}) => {
        const base = "px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide";
        switch(status) {
            case PaymentStatus.Done: return <span className={`${base} bg-green-100 text-green-800`}>Done</span>;
            case PaymentStatus.Pending: return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>;
            default: return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
        }
    }

    const EmptyState = ({ message }: { message: string }) => (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <p className="text-gray-500 font-medium">{message}</p>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Approvals Queue</h1>

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button 
                        onClick={() => setActiveTab('employer')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === 'employer' 
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Employer Registrations <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{registrations.length}</span>
                    </button>
                     <button 
                        onClick={() => setActiveTab('candidate')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === 'candidate' 
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Candidate Selected <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{placements.length}</span>
                    </button>
                </nav>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md min-h-[400px]">
                {activeTab === 'employer' ? (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending Employer Registrations</h2>
                        {registrations.length === 0 ? (
                            <EmptyState message="All caught up! No pending employer registrations." />
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Employer</th>
                                        <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {registrations.map(reg => (
                                        <tr key={reg.id} className="hover:bg-blue-50 transition-colors">
                                            <td className="py-4 px-4 font-medium text-gray-800">{reg.employer}</td>
                                            <td className="py-4 px-4 text-gray-600">{reg.contact}</td>
                                            <td className="py-4 px-4 text-gray-600">{reg.email}</td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <button onClick={() => handleRejectRegistration(reg.id)} className="px-4 py-2 bg-white border border-gray-300 text-red-600 font-semibold rounded-md hover:bg-red-50 text-sm transition-colors">Reject</button>
                                                    <button onClick={() => handleApproveRegistration(reg.id)} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 text-sm transition-colors shadow-sm">Approve</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending Candidate Placements</h2>
                        {placements.length === 0 ? (
                            <EmptyState message="All caught up! No pending placements." />
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Candidate</th>
                                        <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Job Title</th>
                                        <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Employer</th>
                                        <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Payment</th>
                                        <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {placements.map(placement => (
                                        <tr key={placement.id} className="hover:bg-blue-50 transition-colors">
                                            <td className="py-4 px-4 font-medium text-gray-800">{placement.candidate}</td>
                                            <td className="py-4 px-4 text-gray-600">{placement.jobTitle}</td>
                                            <td className="py-4 px-4 text-gray-600">{placement.employer}</td>
                                            <td className="py-4 px-4"><PaymentBadge status={placement.payment} /></td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <button onClick={() => handleRejectPlacement(placement.id)} className="px-4 py-2 bg-white border border-gray-300 text-red-600 font-semibold rounded-md hover:bg-red-50 text-sm transition-colors">Reject</button>
                                                    <button onClick={() => handleApprovePlacement(placement.id)} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 text-sm transition-colors shadow-sm">Approve</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Approvals;
