
import React, { useState, useRef, useEffect } from 'react';
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
import Approvals from './components/Approvals'; // Import new component
import { useGlobalState } from '../../contexts/StateContext'; 
import DashboardHeader from '../../components/DashboardHeader';
import { UserType } from '../../types';

// Modern SVG Icons (Heroicons style)
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
const BuildingOfficeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>;
const SalespersonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>;
const ClipboardCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>;
const ArrowLeftOnRectangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>;
const PencilIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>;

export type AdminPage = 'dashboard' | 'candidates' | 'employers' | 'sales' | 'candidateProfile' | 'employerProfile' | 'candidateDocuments' | 'employerDocuments' | 'financials' | 'analytics' | 'approvals';

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
    { id: 'approvals', label: 'Approvals', icon: <ClipboardCheckIcon /> }, // Added Approvals
    { id: 'sales', label: 'Salesperson', icon: <SalespersonIcon /> },
    { id: 'financials', label: 'Financials', icon: <CreditCardIcon /> },
    { id: 'analytics', label: 'Analytics', icon: <ChartBarIcon /> },
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200 min-h-screen flex flex-col shadow-xl z-20 transition-all duration-300">
      <div className="p-8 border-b border-gray-200">
        <img src="https://ik.imagekit.io/ui4mpbzoy/removed-background.png?updatedAt=1764657414508" alt="MingHwee" className="h-12 w-auto mb-2" />
        <p className="text-xs text-gray-500 mt-2 font-medium tracking-widest uppercase">Admin Portal</p>
      </div>
      
      <nav className="flex-grow p-4 space-y-3 mt-4">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as AdminPage)}
            className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 group relative overflow-hidden border ${
              activeTab === item.id 
                ? 'text-blue-700 font-bold bg-blue-50/80 shadow-md translate-x-1 border-blue-100' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1 border-transparent'
            }`}
          >
            {activeTab === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-r-full"></div>
            )}
            <span className={`transition-all duration-300 ${activeTab === item.id ? 'text-blue-600 scale-110 drop-shadow-sm' : 'text-gray-400 group-hover:text-blue-500'}`}>
                {item.icon}
            </span>
            <span className="text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-6 border-t border-gray-200 mb-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-6 py-3 rounded-2xl text-left text-red-600 hover:bg-red-50/80 hover:text-red-700 transition-all duration-300 hover:shadow-sm border border-transparent hover:border-red-100"
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
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { candidates, employers, salespersons, adminProfile, updateAdminProfile } = useGlobalState();

  // Profile Card State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState(adminProfile);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
        setIsEditingProfile(false); // Reset edit mode when closing
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    // Combine filtered results
    const foundCandidates = candidates
      .filter(c => c.name.toLowerCase().includes(lowerQuery))
      .map(c => ({ ...c, type: 'candidate' }));
      
    const foundEmployers = employers
      .filter(e => e.employerName.toLowerCase().includes(lowerQuery) || e.name.toLowerCase().includes(lowerQuery))
      .map(e => ({ ...e, type: 'employer' }));
      
    const foundSalespersons = salespersons
      .filter(s => s.name.toLowerCase().includes(lowerQuery))
      .map(s => ({ ...s, type: 'salesperson' }));

    setSearchResults([...foundCandidates, ...foundEmployers, ...foundSalespersons]);
  };

  const handleResultClick = (result: any) => {
    setSearchQuery('');
    setSearchResults([]);
    
    if (result.type === 'candidate') {
      navigate('candidateProfile'); // In real app, would set specific ID
    } else if (result.type === 'employer') {
      navigate('employerProfile'); // In real app, would set specific ID
    } else if (result.type === 'salesperson') {
      navigate('sales'); // In real app, would open specific view
    }
  };

  const handleDeepLink = (view: AdminPage, params?: any) => {
      setPage(view);
      if (view === 'sales' && params?.viewProfileId) {
          console.log("Navigating to salesperson:", params.viewProfileId);
      }
  };

  const handleProfileUpdate = () => {
      updateAdminProfile(editFormData);
      setIsEditingProfile(false);
  };

  const renderContent = () => {
    switch (page) {
      case 'dashboard': return <DashboardView />;
      case 'candidates': return <Candidates navigate={navigate} />;
      case 'employers': return <Employers navigate={navigate} />;
      case 'approvals': return <Approvals />; // Render Approvals component
      case 'sales': return <SalesView />;
      case 'financials': return <FinancialView />;
      case 'analytics': return <AnalyticsView />;
      case 'candidateProfile': return <CandidateProfile navigate={navigate} />;
      case 'employerProfile': return <EmployerProfile navigate={navigate} />;
      case 'candidateDocuments': return <ViewCandidateDocuments navigate={navigate} />;
      case 'employerDocuments': return <ViewEmployerDocuments navigate={navigate} />;
      default: return <DashboardView />;
    }
  };

  // Search Bar Component
  const SearchBarNode = (
    <div className="relative w-full group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon />
        </div>
        <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search candidate, employer, salesperson..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-gray-300 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none shadow-md text-gray-700 placeholder-gray-400"
        />
        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2">
                {searchResults.map((result, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => handleResultClick(result)}
                        className="px-5 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0 flex items-center gap-3 transition-colors"
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase ${
                            result.type === 'candidate' ? 'bg-blue-400' : 
                            result.type === 'employer' ? 'bg-green-400' : 'bg-orange-400'
                        }`}>
                            {(result.name || result.employerName || '?').charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-800">{result.name || result.employerName}</p>
                            <p className="text-xs text-gray-500 capitalize">{result.type}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );

  // Profile Node Component (with dropdown logic)
  const ProfileNode = (
    <div className="relative" ref={profileRef}>
        <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-200 border-2 border-white cursor-pointer hover:scale-105 transition-transform"
        >
            {adminProfile.name.charAt(0)}
        </div>

        {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl z-50 border border-gray-100 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white text-blue-600 flex items-center justify-center text-2xl font-bold border-4 border-blue-400/50">
                            {adminProfile.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-lg">{adminProfile.name}</p>
                            <p className="text-xs text-blue-100 uppercase tracking-wider">{adminProfile.role}</p>
                        </div>
                    </div>
                    {!isEditingProfile && (
                        <button 
                            onClick={() => {
                                setEditFormData(adminProfile);
                                setIsEditingProfile(true);
                            }}
                            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white"
                            title="Edit Profile"
                        >
                            <PencilIcon />
                        </button>
                    )}
                </div>
                
                <div className="p-6">
                    {isEditingProfile ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                                <input 
                                    type="text" 
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                                <input 
                                    type="email" 
                                    value={editFormData.email}
                                    onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
                                <input 
                                    type="tel" 
                                    value={editFormData.phone}
                                    onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button 
                                    onClick={() => setIsEditingProfile(false)}
                                    className="flex-1 py-2 bg-gray-100 text-gray-600 font-bold rounded-lg text-xs hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleProfileUpdate}
                                    className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-lg text-xs hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Email</p>
                                    <p className="text-sm font-medium text-gray-800 break-all">{adminProfile.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Phone</p>
                                    <p className="text-sm font-medium text-gray-800">{adminProfile.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Employee ID</p>
                                    <p className="text-sm font-medium text-gray-800">{adminProfile.employeeId}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  );

  return (
    <div className="flex bg-[#F8FAFC] font-sans min-h-screen relative overflow-hidden selection:bg-blue-200 selection:text-blue-900">
      {/* Ambient Background Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-100/20 rounded-full blur-[120px] pointer-events-none z-0 animate-float" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100/15 rounded-full blur-[100px] pointer-events-none z-0 animate-float-delayed" />
      <div className="fixed top-[40%] right-[20%] w-[30%] h-[30%] bg-orange-50/20 rounded-full blur-[90px] pointer-events-none z-0 animate-float" />

      <AdminSidebar activeTab={page} setActiveTab={setPage} onLogout={onLogout} />
      
      <main className="flex-1 overflow-hidden h-screen relative z-10 flex flex-col">
        {/* Pass onNavigate to allow header actions (like notification clicks) to change main view */}
        <DashboardHeader 
            userName={adminProfile.name} 
            userType={UserType.Admin} 
            userId={0} 
            onNavigate={handleDeepLink}
            searchBar={SearchBarNode}
            profileNode={ProfileNode}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-8 pt-4 lg:p-12 lg:pt-6 scroll-smooth">
            <div className="max-w-[1600px] mx-auto">
                {renderContent()}
            </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
