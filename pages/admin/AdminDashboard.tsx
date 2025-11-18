import React, { useState } from 'react';
import DashboardView from './components/DashboardView';
import Candidates from './components/Candidates';
import Employers from './components/Employers';
import Approvals from './components/Approvals';
import CandidateProfile from './components/CandidateProfile';
import EmployerProfile from './components/EmployerProfile';
import ViewCandidateDocuments from './components/ViewCandidateDocuments';
import ViewEmployerDocuments from './components/ViewEmployerDocuments';

const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 004.773-9.612" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const CheckBadgeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

export type AdminPage = 'dashboard' | 'candidates' | 'employers' | 'approvals' | 'candidateProfile' | 'employerProfile' | 'candidateDocuments' | 'employerDocuments';

interface SidebarProps {
  activeTab: AdminPage;
  setActiveTab: (tab: AdminPage) => void;
  onLogout: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'candidates', label: 'Candidates', icon: <UsersIcon /> },
    { id: 'employers', label: 'Employers', icon: <BriefcaseIcon /> },
    { id: 'approvals', label: 'Approvals', icon: <CheckBadgeIcon /> },
  ];

  return (
    <div className="w-72 bg-white min-h-screen flex flex-col p-4 border-r border-gray-200">
      <div className="mb-10">
        <div className="text-2xl font-bold text-gray-800">MingHwee</div>
      </div>
      <p className="text-sm text-gray-500 mb-4 uppercase font-semibold">Admin Panel</p>
      <nav className="flex-grow">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as AdminPage)}
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
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-500 hover:bg-red-50"
        >
          <LogoutIcon />
          <span>Log out</span>
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
    <div className="flex bg-gray-50">
      <AdminSidebar activeTab={page} setActiveTab={setPage} onLogout={onLogout} />
      <main className="flex-1 p-8 overflow-auto h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
