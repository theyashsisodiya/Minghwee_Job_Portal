
import React, { useState } from 'react';
import { Country, Client, JobPosting, CandidateApplicationStatus, UserType } from '../../types';
import ViewJobs from '../employer/components/ViewJobs';
import PostJobForm from '../employer/components/PostJobForm';
import JobDetails from '../employer/components/JobDetails';
import Payment from '../employer/components/Payment';
import ViewDocuments from '../employer/components/ViewDocuments';
import SalesScheduledInterviews from './components/SalesScheduledInterviews';
import SalesProgressTracker from './components/SalesProgressTracker';
import { useGlobalState } from '../../contexts/StateContext';
import DashboardHeader from '../../components/DashboardHeader';

// --- ICONS ---
const ClientsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.28-1.25-.743-1.659M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.28-1.25.743-1.659M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79-4-4-1.79-4-4-4z" /></svg>;
const ScheduledInterviewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ProgressTrackerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const HelpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

// Help Modal Component
const HelpModal: React.FC<{ isOpen: boolean; onClose: () => void; onSubmit: (message: string) => void }> = ({ isOpen, onClose, onSubmit }) => {
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(message);
        setMessage('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
            <div className="bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-md border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Contact Admin</h2>
                <p className="text-sm text-gray-500 mb-6">Describe your issue or request. This will be sent directly to the administrator's dashboard.</p>
                
                <form onSubmit={handleSubmit}>
                    <textarea 
                        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] mb-6 resize-none shadow-inner"
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <div className="flex justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="px-5 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 font-semibold rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={!message.trim()}
                            className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:bg-gray-400 disabled:shadow-none"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SalesSidebar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void; onLogout: () => void; onHelp: () => void; }> = ({ activeTab, setActiveTab, onLogout, onHelp }) => {
    const navItems = [
        { id: 'clients', label: 'Employers', icon: <ClientsIcon /> },
        { id: 'scheduled', label: 'Interviews', icon: <ScheduledInterviewIcon /> },
        { id: 'progress', label: 'Pipeline', icon: <ProgressTrackerIcon /> },
    ];
    
    return (
        <div className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200 min-h-screen flex flex-col shadow-2xl z-20 relative">
            <div className="p-8 border-b border-gray-100">
                <img src="https://ik.imagekit.io/ui4mpbzoy/removed-background.png?updatedAt=1764657414508" alt="MingHwee" className="h-12 w-auto mb-2" />
                <p className="text-[10px] text-gray-400 mt-2 font-bold tracking-[0.2em] uppercase">Sales Portal</p>
            </div>

            <nav className="flex-grow p-4 space-y-3 mt-4">
                 {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 group relative overflow-hidden ${
                        activeTab === item.id
                            ? 'text-orange-700 font-bold bg-orange-50 shadow-sm translate-x-1'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1'
                        }`}
                    >
                        {activeTab === item.id && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r-full"></div>
                        )}
                        <span className={`transition-all duration-300 ${activeTab === item.id ? 'text-orange-600 scale-110' : 'text-gray-400 group-hover:text-orange-500'}`}>
                            {item.icon}
                        </span>
                        <span className="text-sm tracking-wide">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-6 border-t border-gray-100 space-y-2">
                <button onClick={onHelp} className="w-full flex items-center space-x-3 px-6 py-3 rounded-2xl text-left text-gray-500 hover:bg-gray-50 transition-all duration-300">
                    <HelpIcon />
                    <span className="font-medium text-sm">Help & Support</span>
                </button>
                <button onClick={onLogout} className="w-full flex items-center space-x-3 px-6 py-3 rounded-2xl text-left text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300">
                    <LogoutIcon />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

type ClientViewPage = 'viewJobs' | 'postJob' | 'editJob' | 'jobDetails' | 'payment' | 'viewDocuments' | 'progress';

const EmployerManager: React.FC<{ client: Client; onBack: () => void; navigateToSalesTab: (tab: 'scheduled') => void; }> = ({ client, onBack, navigateToSalesTab }) => {
    const [activeTab, setActiveTab] = useState<ClientViewPage>('viewJobs');
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    const [jobFormInitialData, setJobFormInitialData] = useState<any>(null);

    const { updateApplicationStatus, getRequirementsByEmployer, markRequirementConverted } = useGlobalState();

    const navigate = (page: ClientViewPage, jobId?: number) => {
        if (jobId) setSelectedJobId(jobId);
        setActiveTab(page);
    };
    
    const country = client.contact.startsWith('+63') ? Country.Philippines : Country.Singapore;
    const requirements = getRequirementsByEmployer(client.id);
    const pendingRequirements = requirements.filter(r => r.status === 'Pending Review');
    
    const handleInvite = (applicationId: number) => {
        updateApplicationStatus(applicationId, CandidateApplicationStatus.InterviewInvited);
        navigateToSalesTab('scheduled');
    };

    const handleCreateJobFromReq = (req: any) => {
        setJobFormInitialData({
            jobTitle: req.role,
            jobCategory: 'Domestic Helper',
            location: 'Singapore',
            jobDescription: `${req.details || ''}\n\nBudget: ${req.budget || 'N/A'}\nWorking Hours: ${req.workingHours || 'N/A'}`,
            salaryMin: req.budget ? parseInt(req.budget.split('-')[0]) : 0,
            salaryMax: req.budget ? parseInt(req.budget.split('-')[1]) || 0 : 0
        });
        markRequirementConverted(req.id);
        setActiveTab('postJob');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'viewJobs': 
                return (
                    <div>
                        {pendingRequirements.length > 0 && (
                            <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                                    Pending Job Requirements
                                </h3>
                                <div className="space-y-4">
                                    {pendingRequirements.map(req => (
                                        <div key={req.id} className="bg-white p-5 rounded-xl shadow-sm border border-yellow-100 hover:border-yellow-300 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-bold text-gray-800 text-lg">{req.role}</p>
                                                    <p className="text-sm text-gray-500 mt-1">Submitted: {new Date(req.submittedDate).toLocaleDateString()}</p>
                                                    {req.budget && <span className="inline-block mt-2 bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold mr-2">Budget: {req.budget}</span>}
                                                    {req.details && <p className="text-sm text-gray-600 mt-3 bg-gray-50 p-3 rounded-lg italic border border-gray-100">"{req.details}"</p>}
                                                </div>
                                                <button 
                                                    onClick={() => handleCreateJobFromReq(req)}
                                                    className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                                                >
                                                    Create Job Posting
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <ViewJobs navigate={navigate} country={country} employerId={client.id} allowPosting={true} />
                    </div>
                );
            case 'postJob': return <PostJobForm country={country} navigate={navigate} employerId={client.id} initialData={jobFormInitialData} />;
            case 'editJob': return <PostJobForm country={country} navigate={navigate} isEditing employerId={client.id} />;
            case 'jobDetails': return <JobDetails onBack={() => navigate('viewJobs')} jobId={selectedJobId} onInvite={handleInvite} />;
            case 'payment': return <Payment navigate={() => { /* Sales flow logic */ }} onPaymentSuccess={() => {}} candidate={null} />;
            case 'viewDocuments': return <ViewDocuments navigate={() => { /* Sales flow logic */ }} candidate={null} navigateToPayment={() => {}} />;
            case 'progress': return <ViewJobs navigate={navigate} country={country} employerId={client.id} allowPosting={true} />;
            default: return <ViewJobs navigate={navigate} country={country} employerId={client.id} allowPosting={true} />;
        }
    };
    
    return (
        <div>
            <div className="mb-8">
                <button onClick={onBack} className="text-blue-600 hover:text-blue-800 font-semibold flex items-center mb-6 transition-colors group">
                    <span className="p-1 rounded-full bg-blue-50 group-hover:bg-blue-100 mr-2 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </span>
                    Back to Employer List
                </button>
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 flex items-center justify-center font-bold text-2xl shadow-sm">
                            {(client.employerName || client.name).charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{client.employerName || client.name}</h1>
                            <div className="flex items-center gap-3 mt-1 text-gray-500">
                                <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>{client.email}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>{client.contact}</span>
                            </div>
                        </div>
                        {client.isRegistered && <span className="ml-auto px-4 py-2 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200 uppercase tracking-wide">Registered User</span>}
                    </div>
                </div>
            </div>
            {renderContent()}
        </div>
    );
};

const AddEmployerControl: React.FC = () => {
    const { employers, clients, addEmployerAsClient } = useGlobalState();
    const [selectedEmployerId, setSelectedEmployerId] = useState('');

    const unmanagedEmployers = employers.filter(emp => !clients.some(cli => cli.id === emp.id));

    const handleAdd = () => {
        if (selectedEmployerId) {
            addEmployerAsClient(parseInt(selectedEmployerId));
            setSelectedEmployerId('');
        }
    };

    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 mb-8 flex items-center justify-between">
            <h3 className="text-gray-700 font-bold">Assign Employer to Manage</h3>
            <div className="flex gap-4">
                <select 
                    className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    value={selectedEmployerId}
                    onChange={(e) => setSelectedEmployerId(e.target.value)}
                >
                    <option value="">Select Unassigned Employer</option>
                    {unmanagedEmployers.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.employerName}</option>
                    ))}
                </select>
                <button 
                    onClick={handleAdd}
                    disabled={!selectedEmployerId}
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
                >
                    Assign to Me
                </button>
            </div>
        </div>
    );
};

const SalesDashboard: React.FC<{ userName: string; onLogout: () => void }> = ({ userName, onLogout }) => {
    const [activeTab, setActiveTab] = useState('clients');
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [showHelpModal, setShowHelpModal] = useState(false);
    
    const { clients, addClient, sendHelpMessage, salespersons } = useGlobalState();
    
    // Find current salesperson ID (mock logic assuming first for now or search by name)
    const currentSalesperson = salespersons.find(s => s.name === userName) || salespersons[0];

    const handleAddClient = () => {
        const name = prompt('Enter Client/Contact Name:');
        const email = prompt('Enter Client Email:');
        if (name && email) {
            addClient({ id: Date.now(), name, email, contact: '+65 0000 0000' });
        }
    };

    const handleHelpSubmit = (message: string) => {
        sendHelpMessage(currentSalesperson.id, userName, message);
        alert("Help request sent to Admin.");
    };

    const renderContent = () => {
        if (selectedClient) {
            return <EmployerManager client={selectedClient} onBack={() => setSelectedClient(null)} navigateToSalesTab={setActiveTab as any} />;
        }

        switch (activeTab) {
            case 'clients':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Employer Management</h1>
                                <p className="text-gray-500 mt-1">Oversee accounts and manage job requirements.</p>
                            </div>
                            <button onClick={handleAddClient} className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200 flex items-center">
                                <span className="text-xl mr-2 leading-none">+</span> Add Client
                            </button>
                        </div>
                        
                        <AddEmployerControl />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {clients.map(client => (
                                <div key={client.id} className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center font-bold text-gray-600 text-xl border border-white shadow-sm">
                                            {(client.employerName || client.name).charAt(0)}
                                        </div>
                                        <button 
                                            onClick={() => setSelectedClient(client)}
                                            className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                                        >
                                            Manage &rarr;
                                        </button>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">{client.employerName || client.name}</h3>
                                    <div className="text-sm text-gray-500 space-y-1">
                                        <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> {client.email}</p>
                                        <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> {client.contact}</p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${client.isRegistered ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                            {client.isRegistered ? 'Registered' : 'Manual Entry'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'scheduled':
                return <SalesScheduledInterviews />;
            case 'progress':
                return <SalesProgressTracker />;
            default:
                return null;
        }
    };

    return (
        <div className="flex bg-[#F8FAFC] font-sans min-h-screen relative overflow-hidden selection:bg-orange-100 selection:text-orange-900">
            {/* Ambient Background Orbs */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-100/30 rounded-full blur-[120px] pointer-events-none z-0 animate-float" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-100/20 rounded-full blur-[100px] pointer-events-none z-0 animate-float-delayed" />

            <SalesSidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onLogout={onLogout} 
                onHelp={() => setShowHelpModal(true)}
            />
            
            <main className="flex-1 overflow-hidden h-screen relative z-10 flex flex-col">
                <DashboardHeader userName={userName} userType={UserType.Sales} userId={currentSalesperson.id} />
                <div className="flex-1 overflow-auto p-8 pt-4 lg:p-12 lg:pt-6 scroll-smooth">
                    <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {renderContent()}
                    </div>
                </div>
            </main>

            <HelpModal 
                isOpen={showHelpModal} 
                onClose={() => setShowHelpModal(false)} 
                onSubmit={handleHelpSubmit} 
            />
        </div>
    );
};

export default SalesDashboard;
