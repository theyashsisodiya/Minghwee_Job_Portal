
import React, { useState } from 'react';
import DashboardView from './components/DashboardView';
import Candidates from './components/Candidates';
import Employers from './components/Employers';
import CandidateProfile from './components/CandidateProfile';
import EmployerProfile from './components/EmployerProfile';
import ViewCandidateDocuments from './components/ViewCandidateDocuments';
import ViewEmployerDocuments from './components/ViewEmployerDocuments';
import SalesView from './components/SalesView';
import FinancialView from './components/FinancialView';
import AnalyticsView from './components/AnalyticsView';

// Modern SVG Icons (Heroicons style)
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
const BuildingOfficeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>;
// Replaced CurrencyDollarIcon with SalespersonIcon (Briefcase)
const SalespersonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>;
const ArrowLeftOnRectangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>;

export type AdminPage = 'dashboard' | 'candidates' | 'employers' | 'sales' | 'candidateProfile' | 'employerProfile' | 'candidateDocuments' | 'employerDocuments' | 'financials' | 'analytics';

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
    { id: 'sales', label: 'Salesperson', icon: <SalespersonIcon /> },
    { id: 'financials', label: 'Financials', icon: <CreditCardIcon /> },
    { id: 'analytics', label: 'Analytics', icon: <ChartBarIcon /> },
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
        return <SalesView />;
      case 'financials':
        return <FinancialView />;
      case 'analytics':
        return <AnalyticsView />;
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
