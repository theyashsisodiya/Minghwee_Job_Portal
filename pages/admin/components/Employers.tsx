
import React, { useState } from 'react';
import { MOCK_MANAGED_EMPLOYERS } from '../../../constants';
import { AdminPage } from '../AdminDashboard';
import { EmployerStatus } from '../../../types';

interface EmployersProps {
    navigate: (page: AdminPage) => void;
}

const StatusBadge: React.FC<{ status: EmployerStatus }> = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider border";
    switch (status) {
        case EmployerStatus.Approved:
            return <span className={`${baseClasses} bg-green-50 text-green-700 border-green-200`}>Approved</span>;
        case EmployerStatus.Pending:
            return <span className={`${baseClasses} bg-yellow-50 text-yellow-700 border-yellow-200`}>Pending</span>;
        case EmployerStatus.Declined:
            return <span className={`${baseClasses} bg-red-50 text-red-700 border-red-200`}>Declined</span>;
        default:
            return <span className={`${baseClasses} bg-gray-50 text-gray-700 border-gray-200`}>{status}</span>;
    }
};

const Employers: React.FC<EmployersProps> = ({ navigate }) => {
    const [filterStatus, setFilterStatus] = useState<string>('All');

    const filteredEmployers = filterStatus === 'All' 
        ? MOCK_MANAGED_EMPLOYERS 
        : MOCK_MANAGED_EMPLOYERS.filter(emp => emp.status === filterStatus);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Employers Management</h1>
            <p className="text-gray-500 mb-8">Manage registered employers and verification status.</p>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:max-w-md">
                    <input 
                        type="text" 
                        placeholder="Search employers..." 
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>
                 <div className="relative w-full md:w-auto">
                    <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 cursor-pointer font-medium shadow-sm"
                    >
                        <option value="All">All Statuses</option>
                        {Object.values(EmployerStatus).map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-200">
                            <th className="py-5 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Employer</th>
                            <th className="py-5 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Contact Person</th>
                            <th className="py-5 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                            <th className="py-5 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredEmployers.length > 0 ? (
                            filteredEmployers.map(employer => (
                                <tr key={employer.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="py-5 px-6">
                                        <div className="font-bold text-gray-800 text-base">{employer.employerName}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">{employer.email}</div>
                                    </td>
                                    <td className="py-5 px-6 text-gray-600 font-medium">{employer.name}</td>
                                    <td className="py-5 px-6"><StatusBadge status={employer.status} /></td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center justify-center gap-3">
                                            <button 
                                                onClick={() => navigate('employerDocuments')} 
                                                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors text-xs font-bold uppercase tracking-wide border border-transparent hover:border-blue-200"
                                            >
                                                Docs
                                            </button>
                                            <button 
                                                onClick={() => navigate('employerProfile')} 
                                                className="bg-white border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-4 py-1.5 rounded-lg transition-all text-xs font-bold uppercase tracking-wide shadow-sm"
                                            >
                                                Profile
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-12 text-center text-gray-500">
                                    No employers found matching "{filterStatus}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employers;
