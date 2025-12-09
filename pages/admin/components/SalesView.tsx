
import React, { useState } from 'react';
import { useGlobalState } from '../../../contexts/StateContext';
import { Salesperson, JobStatus, CandidateApplicationStatus } from '../../../types';

const AddSalespersonModal: React.FC<{ isOpen: boolean; onClose: () => void; onAdd: (data: any) => void }> = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '', 
        password: '',
        // Optional fields
        address: '',
        emergencyContact: '',
        dob: '',
        department: '' 
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(formData);
        alert(`Salesperson ${formData.name} added successfully!`);
        onClose();
        setFormData({ 
            name: '', email: '', phone: '', password: '', 
            address: '', emergencyContact: '', dob: '', department: '' 
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Add Salesperson</h2>
                        <p className="text-gray-500 text-sm mt-1">Create a new account for a sales representative.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-sm font-bold text-blue-900 uppercase mb-4 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Mandatory Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Lim" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                                <input type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@company.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                                <input type="tel" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+65 9123 4567" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
                                <input type="password" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="Create a strong password" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 px-2">Additional Information (Optional)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="Residential Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                                    <option value="">Select Department</option>
                                    <option value="Domestic Sales">Domestic Sales</option>
                                    <option value="Corporate Sales">Corporate Sales</option>
                                    <option value="Renewal Team">Renewal Team</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="Name & Phone Number" value={formData.emergencyContact} onChange={e => setFormData({...formData, emergencyContact: e.target.value})} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                        <button type="submit" className="px-5 py-2.5 text-white bg-blue-600 font-medium rounded-lg hover:bg-blue-700 shadow-md transition-colors">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SalespersonDetailModal: React.FC<{ salesperson: Salesperson | null; onClose: () => void }> = ({ salesperson, onClose }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'jobs'>('overview');
    const [showPassword, setShowPassword] = useState(false);
    const { jobs } = useGlobalState();

    if (!salesperson) return null;

    // Simulate getting jobs posted by this salesperson
    const salespersonJobs = jobs.slice(0, salesperson.jobsPosted); 

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-start bg-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                            {salesperson.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{salesperson.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-semibold">Active</span>
                                <p className="text-gray-500 text-sm">ID: #{salesperson.id}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex border-b bg-white">
                    <button 
                        className={`flex-1 py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'overview' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview & Credentials
                    </button>
                    <button 
                        className={`flex-1 py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'jobs' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('jobs')}
                    >
                        Jobs Posted ({salespersonJobs.length})
                    </button>
                </div>
                
                <div className="p-8 overflow-y-auto bg-white">
                    {activeTab === 'overview' ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Contact Details</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-gray-700 group">
                                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                                                <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            </div>
                                            <span className="text-sm font-medium">{salesperson.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700 group">
                                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                                                <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            </div>
                                            <span className="text-sm font-medium">{salesperson.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700 group">
                                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                                                <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            </div>
                                            <span className="text-sm font-medium">Joined: {new Date(salesperson.joinedDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Security & Access</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-600">Password</span>
                                            <button onClick={() => setShowPassword(!showPassword)} className="text-blue-600 text-xs hover:underline">
                                                {showPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between bg-white p-2 rounded border border-gray-300">
                                            <span className="text-sm font-mono text-gray-800">
                                                {showPassword ? (salesperson.password || 'Not Set') : '••••••••'}
                                            </span>
                                            <button 
                                                className="text-gray-400 hover:text-gray-600"
                                                onClick={() => {navigator.clipboard.writeText(salesperson.password || '')}}
                                                title="Copy Password"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Role: <span className="font-semibold text-gray-700">Salesperson</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">Workload Snapshot</h3>
                                <div className="grid grid-cols-3 gap-4 text-center divide-x divide-gray-200">
                                    <div className="px-2">
                                        <p className="text-3xl font-bold text-blue-600">{salesperson.activeEmployers}</p>
                                        <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-wide">Employers</p>
                                    </div>
                                    <div className="px-2">
                                        <p className="text-3xl font-bold text-yellow-600">{salesperson.candidatesInProgress}</p>
                                        <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-wide">In-Progress</p>
                                    </div>
                                    <div className="px-2">
                                        <p className="text-3xl font-bold text-green-600">{salesperson.successfulHires}</p>
                                        <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-wide">Placements</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Job History</h3>
                                <span className="text-sm text-gray-500">Total: {salespersonJobs.length}</span>
                            </div>
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                {salespersonJobs.length > 0 ? (
                                    salespersonJobs.map(job => (
                                        <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white hover:border-blue-300">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-gray-800">{job.title}</h4>
                                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs mr-2">{job.category}</span>
                                                        <span>{job.location}</span>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {job.status}
                                                </span>
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
                                                <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                                                <span className="font-medium text-gray-700">{job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                        <p className="text-gray-500">No jobs found for this salesperson.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SalesActivityChart: React.FC<{ salespersons: Salesperson[] }> = ({ salespersons }) => {
    // Enhanced bar chart visualization
    // We assume a target of 60 for visualization if hire is lower, or slightly above hire for dynamism
    const getTarget = (hires: number) => Math.max(hires + 10, 60);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Sales Team Performance Overview</h2>
                    <p className="text-sm text-gray-500 mt-1">Comparision of actual hires vs monthly targets per agent.</p>
                </div>
                <div className="flex gap-4">
                    <span className="flex items-center text-sm text-gray-600 font-medium"><span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>Actual Hires</span>
                    <span className="flex items-center text-sm text-gray-600 font-medium"><span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>Monthly Target</span>
                </div>
            </div>
            
            {/* Chart Area - Reduced Height and Centered Bars */}
            <div className="h-64 w-full overflow-x-auto">
                <div className="flex items-end justify-center h-full gap-16 px-4 min-w-max">
                    {salespersons.map((sp, idx) => {
                        const target = getTarget(sp.successfulHires);
                        const hireHeight = Math.min((sp.successfulHires / target) * 100, 100);
                        
                        return (
                            <div key={sp.id} className="flex flex-col items-center group relative h-full justify-end w-16">
                                {/* Target Bar (Background) */}
                                <div className="w-full bg-gray-100 rounded-t-lg relative flex items-end h-full hover:bg-gray-200 transition-colors">
                                    {/* Hires Bar (Foreground) */}
                                    <div 
                                        className="w-full bg-blue-600 rounded-t-lg transition-all duration-700 ease-out relative shadow-sm group-hover:shadow-md group-hover:bg-blue-700"
                                        style={{ height: `${hireHeight}%` }}
                                    >
                                        {/* Tooltip */}
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
                                            <span className="font-bold">{sp.successfulHires}</span> / {target} Hires
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-center mt-3">
                                    <span className="block text-sm font-bold text-gray-700 truncate w-24 -ml-4">{sp.name}</span>
                                    <span className="block text-xs text-gray-500 mt-0.5">{sp.successfulHires} Hires</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const SalesView: React.FC = () => {
    const { salespersons, jobs, candidates, employers, applications, addSalesperson, removeSalesperson } = useGlobalState();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedSalesperson, setSelectedSalesperson] = useState<Salesperson | null>(null);

    // Global Stats Calculation
    const activeJobs = jobs.filter(j => j.status === JobStatus.Active).length;
    const pendingJobs = jobs.filter(j => j.status === JobStatus.Inactive).length;
    const totalCandidates = candidates.length;
    const totalEmployers = employers.length;
    const hiredCandidates = applications.filter(a => a.status === CandidateApplicationStatus.Hired).length;
    const inProgressCandidates = applications.filter(a => 
        [CandidateApplicationStatus.InterviewInvited, CandidateApplicationStatus.CandidateSelected, CandidateApplicationStatus.MedicalAccepted].includes(a.status)
    ).length;

    const handleRemoveClick = (id: number) => {
        if(window.confirm('Are you sure you want to permanently remove this salesperson from the team? This action cannot be undone.')) {
            removeSalesperson(id);
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Sales & System Overview</h1>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 flex items-center shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add Salesperson
                </button>
            </div>

            {/* Global Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                    <p className="text-sm font-medium text-gray-500">Registered Users</p>
                    <div className="flex justify-between mt-2">
                        <div>
                            <span className="text-2xl font-bold text-gray-900">{totalCandidates}</span>
                            <span className="text-xs text-gray-500 block">Candidates</span>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-gray-900">{totalEmployers}</span>
                            <span className="text-xs text-gray-500 block">Employers</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
                    <p className="text-sm font-medium text-gray-500">Job Status</p>
                    <div className="flex justify-between mt-2">
                        <div>
                            <span className="text-2xl font-bold text-gray-900">{activeJobs}</span>
                            <span className="text-xs text-gray-500 block">Active</span>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-gray-900">{pendingJobs}</span>
                            <span className="text-xs text-gray-500 block">Other</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
                    <p className="text-sm font-medium text-gray-500">Hiring Pipeline</p>
                    <div className="flex justify-between mt-2">
                        <div>
                            <span className="text-2xl font-bold text-gray-900">{inProgressCandidates}</span>
                            <span className="text-xs text-gray-500 block">In Progress</span>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-gray-900">{hiredCandidates}</span>
                            <span className="text-xs text-gray-500 block">Hired</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500 hover:shadow-md transition-shadow">
                    <p className="text-sm font-medium text-gray-500">Sales Force</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{salespersons.length}</p>
                    <p className="text-xs text-gray-500">Active Agents</p>
                </div>
            </div>

            {/* Sales Team Management Table (Full Width) */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Sales Team Management</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Salesperson</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Jobs Posted</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Active Jobs</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Successful Hires</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Efficiency Score</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {salespersons.map(sp => (
                                <tr key={sp.id} className="hover:bg-blue-50 transition-colors group">
                                    <td className="py-4 px-6 font-medium text-gray-800">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-4 text-sm shadow-sm">
                                                {sp.name.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="block text-sm font-bold">{sp.name}</span>
                                                <span className="block text-xs text-gray-500">{sp.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-700 text-center font-medium">{sp.jobsPosted}</td>
                                    <td className="py-4 px-6 text-blue-600 font-bold text-center">{sp.activeJobs}</td>
                                    <td className="py-4 px-6 text-green-600 font-bold text-center">{sp.successfulHires}</td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${sp.efficiency > 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {sp.efficiency}%
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button onClick={() => setSelectedSalesperson(sp)} className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors text-xs font-bold mr-2 uppercase tracking-wide">View</button>
                                        <button onClick={() => handleRemoveClick(sp.id)} className="text-red-600 hover:text-red-800 hover:bg-red-100 px-3 py-1.5 rounded transition-colors text-xs font-bold uppercase tracking-wide">Remove</button>
                                    </td>
                                </tr>
                            ))}
                            {salespersons.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-gray-500 italic bg-gray-50 rounded-b-lg">
                                        No salespeople found. Click 'Add Salesperson' to grow your team.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Sales Performance Chart (Full Width) */}
            <div className="w-full">
                <SalesActivityChart salespersons={salespersons} />
            </div>

            <AddSalespersonModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onAdd={addSalesperson} 
            />
            <SalespersonDetailModal 
                salesperson={selectedSalesperson} 
                onClose={() => setSelectedSalesperson(null)} 
            />
        </div>
    );
};

export default SalesView;
