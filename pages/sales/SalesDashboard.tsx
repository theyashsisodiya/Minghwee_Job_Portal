
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

const SalesSidebar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void; onLogout: () => void; }> = ({ activeTab, setActiveTab, onLogout }) => {
    const navItems = [
        { id: 'clients', label: 'Employers', icon: <ClientsIcon /> },
        { id: 'scheduled', label: 'Scheduled Interview', icon: <ScheduledInterviewIcon /> },
        { id: 'progress', label: 'Progress Tracker', icon: <ProgressTrackerIcon /> },
        { id: 'notifications', label: 'Notifications', icon: <BellIcon /> },
    ];
    return (
        <div className="w-72 bg-white min-h-screen flex flex-col p-4 border-r border-gray-200">
            <div className="mb-10">
                <div className="text-2xl font-bold text-gray-800">MingHwee</div>
            </div>
            <p className="text-sm text-gray-500 mb-4 uppercase font-semibold">Sales Dashboard</p>
            <nav className="flex-grow space-y-1">
                 {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        activeTab === item.id
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="mt-auto">
                <button onClick={onLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-500 hover:bg-red-50">
                    <LogoutIcon />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );
};

type ClientViewPage = 'viewJobs' | 'postJob' | 'editJob' | 'jobDetails' | 'payment' | 'viewDocuments' | 'progress';

// ... (EmployerManager component remains the same) ...
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
                            <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                <h3 className="text-lg font-bold text-yellow-800 mb-4">Pending Job Requirements from Employer</h3>
                                <div className="space-y-4">
                                    {pendingRequirements.map(req => (
                                        <div key={req.id} className="bg-white p-4 rounded shadow-sm border border-gray-200">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-gray-800">Role: {req.role}</p>
                                                    <p className="text-sm text-gray-600 mt-1">Submitted: {new Date(req.submittedDate).toLocaleDateString()}</p>
                                                    {req.budget && <p className="text-sm text-gray-600">Budget: {req.budget}</p>}
                                                    {req.details && <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded italic">"{req.details}"</p>}
                                                </div>
                                                <button 
                                                    onClick={() => handleCreateJobFromReq(req)}
                                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
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
            <div className="mb-6">
                <button onClick={onBack} className="text-blue-600 hover:underline font-semibold flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Employer List
                </button>
                <h1 className="text-3xl font-bold text-gray-800">Managing Employer: {client.employerName || client.name}</h1>
                 <p className="text-gray-500">{client.email} | {client.contact}</p>
                 {client.isRegistered && <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Registered User</span>}
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
            addEmployerAsClient(Number(selectedEmployerId));
            setSelectedEmployerId('');
        }
    };

    return (
        <div className="flex items-center gap-2">
            <select
                value={selectedEmployerId}
                onChange={(e) => setSelectedEmployerId(e.target.value)}
                className="bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select an employer to add</option>
                {unmanagedEmployers.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.employerName}</option>
                ))}
            </select>
            <button
                onClick={handleAdd}
                disabled={!selectedEmployerId}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
                Add Employer
            </button>
        </div>
    );
};

// --- New Components for Sales Dashboard ---

const NotificationsView: React.FC = () => {
    const { employers, clients, addEmployerAsClient } = useGlobalState();
    // Employers not yet in 'clients' list are considered "new" or "unmanaged"
    const unmanagedEmployers = employers.filter(emp => !clients.some(cli => cli.id === emp.id));

    const handleAddClient = (id: number) => {
        addEmployerAsClient(id);
        alert("Employer added to your managed list successfully.");
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">New Employer Registrations</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                {unmanagedEmployers.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No new notifications. All employers are being managed.</p>
                ) : (
                    <div className="space-y-4">
                        {unmanagedEmployers.map(emp => (
                            <div key={emp.id} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg">
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                                    <div>
                                        <p className="font-bold text-gray-800">New Registration: {emp.employerName}</p>
                                        <p className="text-sm text-gray-600">Contact: {emp.name} | {emp.email}</p>
                                        <p className="text-xs text-gray-500 mt-1">A new employer has just created an account and is waiting to be managed.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleAddClient(emp.id)}
                                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap"
                                >
                                    Add to Dashboard
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

interface SalesDashboardProps {
  userName: string;
  onLogout: () => void;
}

const SalesDashboard: React.FC<SalesDashboardProps> = ({ userName, onLogout }) => {
    const { clients } = useGlobalState();
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [activeTab, setActiveTab] = useState('clients');

    const navigateToTab = (tab: 'scheduled') => {
        setSelectedClient(null);
        setActiveTab(tab);
    }

    const EmployerListView = () => (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Employers</h1>
                <AddEmployerControl />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Employer</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Contact</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-4 px-4 text-gray-800 font-medium">
                                    {client.employerName ? `${client.employerName} (${client.name})` : client.name}
                                </td>
                                <td className="py-4 px-4 text-gray-600">{client.email}</td>
                                <td className="py-4 px-4 text-gray-600">{client.contact}</td>
                                <td className="py-4 px-4">
                                    <button onClick={() => { setSelectedClient(client); }} className="text-blue-600 hover:underline font-semibold">
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderContent = () => {
        if (selectedClient) {
            return <EmployerManager client={selectedClient} onBack={() => setSelectedClient(null)} navigateToSalesTab={navigateToTab}/>;
        }
        switch(activeTab) {
            case 'clients': return <EmployerListView />;
            case 'scheduled': return <SalesScheduledInterviews />;
            case 'progress': return <SalesProgressTracker />;
            case 'notifications': return <NotificationsView />;
            default: return <EmployerListView />;
        }
    }

    return (
        <div className="flex bg-gray-50">
            <SalesSidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSelectedClient(null); }} onLogout={onLogout} />
            <main className="flex-1 overflow-auto h-screen">
                <DashboardHeader userName={userName} userType={UserType.Sales} userId={100} />
                <div className="px-8 pb-8">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}

export default SalesDashboard;
