
import React, { useState } from 'react';
import { MOCK_EMPLOYER_REGISTRATIONS, MOCK_CANDIDATE_PLACEMENTS } from '../../../constants';
import { PaymentStatus } from '../../../types';

const Approvals: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'employer' | 'payment'>('employer');
    
    // Local state to simulate functional approvals
    const [registrations, setRegistrations] = useState(MOCK_EMPLOYER_REGISTRATIONS);
    
    // Extended payment mock data with transaction details
    const [payments, setPayments] = useState(MOCK_CANDIDATE_PLACEMENTS.map((p, index) => ({
        ...p,
        transactionId: `TXN-2024-${1000 + index}`,
        amount: p.payment === PaymentStatus.Pending ? '$500.00' : '$2,500.00',
        date: new Date().toLocaleDateString(),
        method: index % 2 === 0 ? 'PayNow' : 'Bank Transfer'
    })));

    const handleApproveRegistration = (id: number) => {
        if(window.confirm('Approve this employer registration?')) {
            setRegistrations(prev => prev.filter(reg => reg.id !== id));
            alert("Employer Registration Approved!");
        }
    };

    const handleRejectRegistration = (id: number) => {
        if(window.confirm('Reject this employer registration?')) {
            setRegistrations(prev => prev.filter(reg => reg.id !== id));
            alert("Employer Registration Rejected.");
        }
    };

    const handleApprovePayment = (id: number) => {
        if(window.confirm('Verify and approve this payment transaction?')) {
            setPayments(prev => prev.map(p => 
                p.id === id ? { ...p, payment: PaymentStatus.Done } : p
            ));
            alert("Payment Approved Successfully! Transaction status updated.");
        }
    };

    const handleRejectPayment = (id: number) => {
        const reason = prompt("Enter rejection reason:");
        if(reason) {
            alert(`Payment rejected. Reason logged: ${reason}`);
            // In real app, update status to Rejected or Flagged
        }
    };

    const PaymentBadge: React.FC<{status: PaymentStatus}> = ({status}) => {
        const base = "px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide border";
        switch(status) {
            case PaymentStatus.Done: return <span className={`${base} bg-green-50 text-green-700 border-green-200`}>Verified</span>;
            case PaymentStatus.Pending: return <span className={`${base} bg-yellow-50 text-yellow-700 border-yellow-200`}>Pending Review</span>;
            default: return <span className={`${base} bg-gray-50 text-gray-700 border-gray-200`}>{status}</span>;
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
                        onClick={() => setActiveTab('payment')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === 'payment' 
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Payment Approvals <span className="ml-2 bg-yellow-100 text-yellow-800 py-0.5 px-2 rounded-full text-xs font-bold">{payments.filter(p => p.payment === PaymentStatus.Pending).length}</span>
                    </button>
                </nav>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 min-h-[400px]">
                {activeTab === 'employer' ? (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Pending Employer Registrations</h2>
                        {registrations.length === 0 ? (
                            <EmptyState message="All caught up! No pending employer registrations." />
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50/50">
                                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider rounded-tl-xl">Employer</th>
                                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right rounded-tr-xl">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {registrations.map(reg => (
                                            <tr key={reg.id} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="py-5 px-6 font-bold text-gray-800">{reg.employer}</td>
                                                <td className="py-5 px-6 text-gray-600">{reg.contact}</td>
                                                <td className="py-5 px-6 text-gray-600">{reg.email}</td>
                                                <td className="py-5 px-6 text-right">
                                                    <div className="flex justify-end space-x-3">
                                                        <button onClick={() => handleRejectRegistration(reg.id)} className="px-4 py-2 bg-white border border-gray-300 text-red-600 font-bold rounded-lg hover:bg-red-50 text-xs transition-colors">Reject</button>
                                                        <button onClick={() => handleApproveRegistration(reg.id)} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 text-xs transition-colors shadow-sm">Approve</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Verification Queue</h2>
                        {payments.length === 0 ? (
                            <EmptyState message="All caught up! No pending payments." />
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50/50">
                                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider rounded-tl-xl">Transaction Details</th>
                                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Parties Involved</th>
                                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right rounded-tr-xl">Verification</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {payments.map(payment => (
                                            <tr key={payment.id} className="hover:bg-blue-50/30 transition-colors group">
                                                <td className="py-5 px-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded w-fit mb-1">{payment.transactionId}</span>
                                                        <span className="text-sm text-gray-600">{payment.method} • {payment.date}</span>
                                                    </div>
                                                </td>
                                                <td className="py-5 px-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-gray-800">{payment.employer}</span>
                                                        <span className="text-xs text-gray-500">Hiring: {payment.candidate} ({payment.jobTitle})</span>
                                                    </div>
                                                </td>
                                                <td className="py-5 px-6 font-bold text-gray-800 text-lg">{payment.amount}</td>
                                                <td className="py-5 px-6"><PaymentBadge status={payment.payment} /></td>
                                                <td className="py-5 px-6 text-right">
                                                    {payment.payment === PaymentStatus.Pending ? (
                                                        <div className="flex justify-end space-x-3">
                                                            <button 
                                                                onClick={() => handleRejectPayment(payment.id)} 
                                                                className="px-4 py-2 bg-white border border-gray-300 text-gray-600 font-bold rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-xs transition-colors"
                                                            >
                                                                Flag Issue
                                                            </button>
                                                            <button 
                                                                onClick={() => handleApprovePayment(payment.id)} 
                                                                className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 text-xs transition-colors shadow-sm flex items-center"
                                                            >
                                                                <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                                Approve Payment
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs font-bold text-green-600 flex items-center justify-end">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                            Verified
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Approvals;
