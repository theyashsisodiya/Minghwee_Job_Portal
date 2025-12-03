
import React, { useState } from 'react';
import { Country, Client, ManagedEmployer } from '../../types';
import ViewJobs from '../employer/components/ViewJobs';
import PostJobForm from '../employer/components/PostJobForm';
import JobDetails from '../employer/components/JobDetails';
import Payment from '../employer/components/Payment';
import ViewDocuments from '../employer/components/ViewDocuments';
import SalesScheduledInterviews from './components/SalesScheduledInterviews';
import SalesProgressTracker from './components/SalesProgressTracker';
import { useGlobalState } from '../../contexts/StateContext';

// --- ICONS ---
const ClientsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.28-1.25-.743-1.659M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.28-1.25.743-1.659M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79-4-4-1.79-4-4-4z" /></svg>;
const ScheduledInterviewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ProgressTrackerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

const SalesSidebar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void; onLogout: () => void; }> = ({ activeTab, setActiveTab, onLogout }) => {
    const navItems = [
        { id: 'clients', label: 'Clients', icon: <ClientsIcon /> },
        { id: 'scheduled', label: 'Scheduled Interview', icon: <ScheduledInterviewIcon /> },
        { id: 'progress', label: 'Progress Tracker', icon: <ProgressTrackerIcon /> },
    ];
    return (
        <div className="w-72 bg-white min-h-screen flex flex-col p-4 border-r border-gray-200">
            <div className="mb-10">
                <div className="text-2xl font-bold text-gray-800">MingHwee</div>
            </div>
            <p className="text-sm text-gray-500 mb-4 uppercase font-semibold">Sales Dashboard</p>
            <nav className="flex-grow">
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

const ClientJobManager: React.FC<{ client: Client; onBack: () => void }> = ({ client, onBack }) => {
    const [activeTab, setActiveTab] = useState<ClientViewPage>('viewJobs');
    const navigate = (page: ClientViewPage) => setActiveTab(page);
    
    // Auto-detect country based on contact prefix for demo purposes, defaulting to Singapore
    const country = client.contact.startsWith('+63') ? Country.Philippines : Country.Singapore;

    const renderContent = () => {
        switch (activeTab) {
            case 'viewJobs': return <ViewJobs navigate={navigate} country={country} employerId={client.id} allowPosting={true} />;
            case 'postJob': return <PostJobForm country={country} navigate={navigate} employerId={client.id} />;
            case 'editJob': return <PostJobForm country={country} navigate={navigate} isEditing employerId={client.id} />;
            case 'jobDetails': return <JobDetails onBack={() => navigate('viewJobs')} />;
            case 'payment': return <Payment navigate={() => { /* Sales flow logic */ }} onPaymentSuccess={() => {}} candidate={null} />;
            case 'viewDocuments': return <ViewDocuments navigate={() => { /* Sales flow logic */ }} candidate={null} navigateToPayment={() => {}} />;
            // Sales client view does not have a "progress" tab, so we fallback to viewJobs if navigated there by shared components
            case 'progress': return <ViewJobs navigate={navigate} country={country} employerId={client.id} allowPosting={true} />;
            default: return <ViewJobs navigate={navigate} country={country} employerId={client.id} allowPosting={true} />;
        }
    };
    
    return (
        <div>
            <div className="mb-6">
                <button onClick={onBack} className="text-blue-600 hover:underline font-semibold flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Client List
                </button>
                <h1 className="text-3xl font-bold text-gray-800">Managing Client: {client.companyName || client.name}</h1>
                 <p className="text-gray-500">{client.email} | {client.contact}</p>
                 {client.isRegistered && <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Registered User</span>}
            </div>
            {renderContent()}
        </div>
    );
};

interface SalesDashboardProps {
  userName: string;
  onLogout: () => void;
}

const SalesDashboard: React.FC<SalesDashboardProps> = ({ userName, onLogout }) => {
    // Access Global State to manage clients and employers
    const { clients } = useGlobalState();
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [activeTab, setActiveTab] = useState('clients');

    const ClientListView = () => (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Clients</h1>
                {/* Manual "Add Client" removed in favor of auto-assignment from Employer Registration */}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Company / Employer</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Contact</th>
                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-4 px-4 text-gray-800 font-medium">
                                    {client.companyName ? `${client.companyName} (${client.name})` : client.name}
                                </td>
                                <td className="py-4 px-4 text-gray-600">{client.email}</td>
                                <td className="py-4 px-4 text-gray-600">{client.contact}</td>
                                <td className="py-4 px-4">
                                    <button onClick={() => { setSelectedClient(client); setActiveTab('clients'); }} className="text-blue-600 hover:underline font-semibold">
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
            return <ClientJobManager client={selectedClient} onBack={() => setSelectedClient(null)} />;
        }
        switch(activeTab) {
            case 'clients':
                return <ClientListView />;
            case 'scheduled':
                return <SalesScheduledInterviews />;
            case 'progress':
                return <SalesProgressTracker />;
            default:
                return <ClientListView />;
        }
    }

    return (
        <div className="flex bg-gray-50">
            <SalesSidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSelectedClient(null); }} onLogout={onLogout} />
            <main className="flex-1 p-8 overflow-auto h-screen">
                {renderContent()}
            </main>
        </div>
    );
}

export default SalesDashboard;
