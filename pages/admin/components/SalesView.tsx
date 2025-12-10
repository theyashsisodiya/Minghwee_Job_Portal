
import React, { useState } from 'react';
import { useGlobalState } from '../../../contexts/StateContext';
import { Salesperson, JobStatus, CandidateApplicationStatus } from '../../../types';

const AddSalespersonModal: React.FC<{ isOpen: boolean; onClose: () => void; onAdd: (data: any) => void }> = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({ 
        name: '', email: '', phone: '', password: '',
        address: '', bio: '', documents: null as FileList | null
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(formData);
        alert(`Salesperson ${formData.name} added successfully!`);
        onClose();
        setFormData({ name: '', email: '', phone: '', password: '', address: '', bio: '', documents: null });
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
            <div className="bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">New Salesperson</h2>
                        <p className="text-gray-500 mt-1">Onboard a new member to the sales team.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Mandatory Section */}
                    <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-200">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                            <h3 className="text-lg font-bold text-gray-800">Mandatory Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                                <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                <input type="email" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm" placeholder="john@company.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                <input type="tel" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm" placeholder="+65 9123 4567" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Password <span className="text-red-500">*</span></label>
                                <input type="password" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                            </div>
                        </div>
                    </div>

                    {/* Optional Section */}
                    <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-200">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-6 bg-gray-400 rounded-full"></div>
                            <h3 className="text-lg font-bold text-gray-800">Optional Details</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Residential Address</label>
                                <input type="text" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition-all shadow-sm" placeholder="Full address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Short Bio / Notes</label>
                                <textarea rows={3} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition-all shadow-sm" placeholder="Any additional information..." value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Upload Documents (ID, Contract)</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white hover:bg-gray-50 transition-colors cursor-pointer relative">
                                    <input type="file" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setFormData({...formData, documents: e.target.files})} />
                                    <div className="space-y-2">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="text-sm text-gray-600">Drag and drop files here, or click to browse</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-8 py-3 text-gray-600 bg-white border border-gray-300 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">Cancel</button>
                        <button type="submit" className="px-8 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 font-bold rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-0.5">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Simplified Detail Modal
const SalespersonDetailModal: React.FC<{ salesperson: Salesperson | null; onClose: () => void }> = ({ salesperson, onClose }) => {
    if (!salesperson) return null;
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg animate-in zoom-in-95 duration-200 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">{salesperson.name}</h2>
                <p className="text-gray-600">Detailed performance view would go here.</p>
                <button onClick={onClose} className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition-colors border border-gray-300">Close</button>
            </div>
        </div>
    );
}


const SalesActivityChart: React.FC<{ salespersons: Salesperson[] }> = ({ salespersons }) => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const getTarget = (hires: number) => Math.max(hires + 10, 60);

    return (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-200 w-full relative overflow-visible group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50/50 rounded-full blur-3xl -z-10" />
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Sales Team Performance Overview</h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Monthly hiring targets vs actual performance.</p>
                </div>
                <div className="flex gap-6 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-600 rounded-full shadow-sm"></span>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">This Month</span>
                            <span className="text-[10px] text-gray-400 font-medium">Actual Hires</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full shadow-inner"></div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Target</span>
                            <span className="text-[10px] text-gray-400 font-medium">Goal</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="h-72 w-full overflow-x-auto pb-4">
                <div className="flex items-end justify-center h-full gap-16 px-4 min-w-max">
                    {salespersons.map((sp) => {
                        const target = getTarget(sp.successfulHires);
                        const hireHeight = Math.min((sp.successfulHires / target) * 100, 100);
                        const lastMonthHires = Math.floor(sp.successfulHires * 0.8); // Mock data for last month

                        return (
                            <div 
                                key={sp.id} 
                                className="flex flex-col items-center group/bar relative h-full justify-end w-20 cursor-pointer"
                                onMouseEnter={() => setHoveredId(sp.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Tooltip */}
                                {hoveredId === sp.id && (
                                    <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 z-20 w-48 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-200 animate-in fade-in slide-in-from-bottom-2">
                                        <p className="font-bold text-gray-800 text-sm mb-2">{sp.name}</p>
                                        <div className="space-y-1 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Target:</span>
                                                <span className="font-bold text-gray-700">{target}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-blue-600 font-semibold">This Month:</span>
                                                <span className="font-bold text-blue-700">{sp.successfulHires}</span>
                                            </div>
                                            <div className="flex justify-between border-t pt-1 mt-1">
                                                <span className="text-gray-400">Last Month:</span>
                                                <span className="font-bold text-gray-500">{lastMonthHires}</span>
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b border-r border-gray-200"></div>
                                    </div>
                                )}

                                <div className="w-full bg-gray-100 rounded-t-2xl relative flex items-end h-full hover:bg-gray-200 transition-colors overflow-hidden border border-gray-200">
                                    <div 
                                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-2xl transition-all duration-700 ease-out relative shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover/bar:from-blue-700 group-hover/bar:to-blue-500 group-hover/bar:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                                        style={{ height: `${hireHeight}%` }}
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <span className="block text-sm font-bold text-gray-700 truncate w-28 -ml-4 group-hover/bar:text-blue-600 transition-colors">{sp.name}</span>
                                    <div className="flex items-center justify-center gap-1 mt-1 opacity-60 group-hover/bar:opacity-100 transition-opacity">
                                        <span className="text-xs font-bold text-blue-600">{sp.successfulHires}</span>
                                        <span className="text-[10px] text-gray-400">/ {target}</span>
                                    </div>
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

    const activeJobs = jobs.filter(j => j.status === JobStatus.Active).length;
    const totalCandidates = candidates.length;
    const totalEmployers = employers.length;
    const hiredCandidates = applications.filter(a => a.status === CandidateApplicationStatus.Hired).length;
    const inProgressCandidates = applications.filter(a => 
        [CandidateApplicationStatus.InterviewInvited, CandidateApplicationStatus.CandidateSelected, CandidateApplicationStatus.MedicalAccepted].includes(a.status)
    ).length;

    const handleRemoveClick = (id: number) => {
        if(window.confirm('Are you sure you want to remove this salesperson?')) {
            removeSalesperson(id);
        }
    }

    const StatCard = ({ title, value, subLabel, colorClass, bgClass, icon }: any) => (
        <div className={`p-6 rounded-[2rem] shadow-md border border-gray-200 transition-all hover:shadow-xl hover:-translate-y-1 ${bgClass}`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${colorClass.replace('text-', 'bg-').replace('600', '100')} bg-opacity-60 backdrop-blur-sm border border-white/50`}>
                    {icon}
                </div>
                <span className={`text-4xl font-bold ${colorClass} tracking-tight`}>{value}</span>
            </div>
            <p className="text-sm font-bold text-gray-800 uppercase tracking-wide opacity-80">{title}</p>
            <p className="text-xs text-gray-500 mt-1 font-medium">{subLabel}</p>
        </div>
    );

    return (
        <div className="space-y-10 pb-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Sales Dashboard</h1>
                    <p className="text-gray-500 mt-2 font-medium">Manage team performance and hiring metrics.</p>
                </div>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 flex items-center shadow-lg shadow-blue-200 transform hover:-translate-y-0.5 transition-all border border-blue-600"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add Salesperson
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Registered Users" 
                    value={totalCandidates + totalEmployers} 
                    subLabel={`${totalCandidates} Candidates | ${totalEmployers} Employers`}
                    colorClass="text-blue-600"
                    bgClass="bg-white"
                    icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                />
                <StatCard 
                    title="Active Jobs" 
                    value={activeJobs} 
                    subLabel="Currently live on platform"
                    colorClass="text-green-600"
                    bgClass="bg-white"
                    icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                />
                <StatCard 
                    title="Hiring Pipeline" 
                    value={inProgressCandidates} 
                    subLabel={`${hiredCandidates} Hired Successfully`}
                    colorClass="text-purple-600"
                    bgClass="bg-white"
                    icon={<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                />
                <StatCard 
                    title="Sales Force" 
                    value={salespersons.length} 
                    subLabel="Active Agents"
                    colorClass="text-orange-600"
                    bgClass="bg-white"
                    icon={<svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.28-1.25-.743-1.659M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.28-1.25.743-1.659M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79-4-4-1.79-4-4-4z" /></svg>}
                />
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 tracking-tight">Sales Team Management</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100/80 border-b border-gray-200">
                                <th className="py-5 px-6 text-xs font-bold text-gray-600 uppercase tracking-widest rounded-tl-2xl">Salesperson</th>
                                <th className="py-5 px-6 text-xs font-bold text-gray-600 uppercase tracking-widest text-center">Jobs Posted</th>
                                <th className="py-5 px-6 text-xs font-bold text-gray-600 uppercase tracking-widest text-center">Active Jobs</th>
                                <th className="py-5 px-6 text-xs font-bold text-gray-600 uppercase tracking-widest text-center">Hires</th>
                                <th className="py-5 px-6 text-xs font-bold text-gray-600 uppercase tracking-widest text-center">Efficiency</th>
                                <th className="py-5 px-6 text-xs font-bold text-gray-600 uppercase tracking-widest text-right rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {salespersons.map(sp => (
                                <tr key={sp.id} className="hover:bg-blue-50/20 transition-colors group">
                                    <td className="py-5 px-6 font-medium text-gray-800">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 flex items-center justify-center font-bold mr-4 text-sm shadow-sm border border-white ring-2 ring-gray-100">
                                                {sp.name.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="block text-sm font-bold text-gray-800">{sp.name}</span>
                                                <span className="block text-xs text-gray-400 font-medium">{sp.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 text-gray-600 text-center font-semibold">{sp.jobsPosted}</td>
                                    <td className="py-5 px-6 text-center"><span className="bg-blue-50 text-blue-700 py-1.5 px-3 rounded-lg font-bold text-xs border border-blue-200">{sp.activeJobs}</span></td>
                                    <td className="py-5 px-6 text-center"><span className="text-green-600 font-bold">{sp.successfulHires}</span></td>
                                    <td className="py-5 px-6 text-center">
                                        <div className="flex items-center justify-center">
                                            <div className="w-20 bg-gray-100 rounded-full h-2 mr-3 overflow-hidden border border-gray-100">
                                                <div className={`h-2 rounded-full ${sp.efficiency > 90 ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-yellow-400 to-yellow-600'}`} style={{width: `${sp.efficiency}%`}}></div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-600">{sp.efficiency}%</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button onClick={() => setSelectedSalesperson(sp)} className="w-24 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all text-xs shadow-sm uppercase tracking-wide">
                                                View
                                            </button>
                                            <button onClick={() => handleRemoveClick(sp.id)} className="w-24 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:border-red-300 transition-all text-xs shadow-sm uppercase tracking-wide">
                                                Remove
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <SalesActivityChart salespersons={salespersons} />

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
