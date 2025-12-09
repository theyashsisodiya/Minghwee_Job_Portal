
import React, { useState } from 'react';
import DashboardView from './components/DashboardView';
import Candidates from './components/Candidates';
import Employers from './components/Employers';
import Approvals from './components/Approvals';
import CandidateProfile from './components/CandidateProfile';
import EmployerProfile from './components/EmployerProfile';
import ViewCandidateDocuments from './components/ViewCandidateDocuments';
import ViewEmployerDocuments from './components/ViewEmployerDocuments';

// Modern SVG Icons (Heroicons style)
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
const BuildingOfficeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>;
const CurrencyDollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ClipboardDocumentCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>;
const ArrowLeftOnRectangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>;

export type AdminPage = 'dashboard' | 'candidates' | 'employers' | 'sales' | 'approvals' | 'candidateProfile' | 'employerProfile' | 'candidateDocuments' | 'employerDocuments';

interface SidebarProps {
  activeTab: AdminPage;
  setActiveTab: (tab: AdminPage) => void;
  onLogout: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'candidates', label: 'Candidates', icon: <UsersIcon /> },
    { id: 'employers', label: 'Employers', icon: <BuildingOfficeIcon /> },
    { id: 'sales', label: 'Sales', icon: <CurrencyDollarIcon /> },
    { id: 'approvals', label: 'Approvals', icon: <ClipboardDocumentCheckIcon /> },
  ];

  return (
    <div className="w-72 bg-white min-h-screen flex flex-col border-r border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="text-2xl font-bold text-blue-900 tracking-tight">MingHwee</div>
        <p className="text-xs text-gray-500 mt-1 font-medium tracking-wide uppercase">Admin Portal</p>
      </div>
      
      <nav className="flex-grow p-4 space-y-1">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as AdminPage)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-blue-50 text-blue-700 shadow-sm font-semibold' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className={`${activeTab === item.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <ArrowLeftOnRectangleIcon />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

interface AdminDashboardProps {
  userName: string;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ userName, onLogout }) => {
  const [page, setPage] = useState<AdminPage>('dashboard');
  const navigate = (newPage: AdminPage) => setPage(newPage);

  const renderContent = () => {
    switch (page) {
      case 'dashboard':
        return <DashboardView />;
      case 'candidates':
        return <Candidates navigate={navigate} />;
      case 'employers':
        return <Employers navigate={navigate} />;
      case 'sales':
        return <DashboardView />; // Placeholder: reuse dashboard or create SalesView later
      case 'approvals':
        return <Approvals />;
      case 'candidateProfile':
        return <CandidateProfile navigate={navigate} />;
      case 'employerProfile':
        return <EmployerProfile navigate={navigate} />;
      case 'candidateDocuments':
        return <ViewCandidateDocuments navigate={navigate} />;
      case 'employerDocuments':
        return <ViewEmployerDocuments navigate={navigate} />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex bg-gray-50 font-sans">
      <AdminSidebar activeTab={page} setActiveTab={setPage} onLogout={onLogout} />
      <main className="flex-1 overflow-auto h-screen">
        <div className="p-8">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
