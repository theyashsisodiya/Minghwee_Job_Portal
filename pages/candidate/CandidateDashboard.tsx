
import React, { useState } from 'react';
import MyDetails from './components/MyDetails';
import InterviewInvites from './components/InterviewInvites';
import ProgressTracker from './components/ProgressTracker';
import ScheduledInterviews from './components/ScheduledInterviews';
import RegistrationWizard, { WizardFormData } from './components/RegistrationWizard';
import { Notification, CandidateProfileData, UserType } from '../../types';
import { useGlobalState } from '../../contexts/StateContext';
import DashboardHeader from '../../components/DashboardHeader';

// --- Icons --- //
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const HelpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const CandidateSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: 'myDetails', label: 'My Profile', icon: <UserIcon /> },
    { id: 'invites', label: 'Invites', icon: <MailIcon /> },
    { id: 'progress', label: 'Progress', icon: <ChartBarIcon /> },
    { id: 'scheduled', label: 'Interviews', icon: <CalendarIcon /> },
  ];

  return (
    <div className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200 min-h-screen flex flex-col shadow-2xl z-20 relative">
      <div className="p-8 border-b border-gray-100">
        <img src="https://ik.imagekit.io/ui4mpbzoy/removed-background.png?updatedAt=1764657414508" alt="MingHwee" className="h-12 w-auto mb-2" />
        <p className="text-[10px] text-gray-400 mt-2 font-bold tracking-[0.2em] uppercase">Candidate Portal</p>
      </div>
      
      <nav className="flex-grow p-4 space-y-3 mt-4">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 group relative overflow-hidden ${
              activeTab === item.id 
                ? 'text-blue-700 font-bold bg-blue-50 shadow-sm translate-x-1' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1'
            }`}
          >
            {activeTab === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full"></div>
            )}
            <span className={`transition-all duration-300 ${activeTab === item.id ? 'text-blue-600 scale-110' : 'text-gray-400 group-hover:text-blue-500'}`}>
                {item.icon}
            </span>
            <span className="text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-6 border-t border-gray-100 space-y-2">
        <button className="w-full flex items-center space-x-3 px-6 py-3 rounded-2xl text-left text-gray-500 hover:bg-gray-50 transition-all duration-300">
          <HelpIcon />
          <span className="font-medium text-sm">Help & Support</span>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-6 py-3 rounded-2xl text-left text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
        >
          <LogoutIcon />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};


interface CandidateDashboardProps {
  userName: string;
  onLogout: () => void;
  isNewUser: boolean;
  onProfileComplete: () => void;
  addNotification: (message: string, type: Notification['type']) => void;
}

const CandidateDashboard: React.FC<CandidateDashboardProps> = ({ userName, onLogout, isNewUser, onProfileComplete, addNotification }) => {
  const [activeTab, setActiveTab] = useState('myDetails');
  const { addCandidate, candidates } = useGlobalState();
  
  // Find the current user's profile. Assume the last one is the newest after registration.
  const currentUserProfile = isNewUser ? null : candidates[candidates.length - 1];
  const currentUserId = currentUserProfile?.id || 1; // Default ID if new user mock

  const handleRegistrationComplete = (data: WizardFormData) => {
      // Map form data to the global state structure
      const newCandidateProfile: Omit<CandidateProfileData, 'id'> = {
          name: data.fullName,
          role: data.role,
          avatarUrl: 'https://i.pravatar.cc/150?u=' + data.email, // Generate avatar from email
          personalInfo: {
              fullName: data.fullName,
              email: data.email,
              phone: data.phone,
              location: `${data.location}, ${data.country}`,
              gender: data.gender,
              dob: data.dob,
          },
          skills: data.skills,
          jobCategories: data.jobCategories,
          processHistory: []
      };
      
      addCandidate(newCandidateProfile); // Add real data to global state
      onProfileComplete(); // Trigger dashboard view
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'myDetails':
        return <MyDetails profileData={currentUserProfile} addNotification={addNotification} />;
      case 'invites':
        return <InterviewInvites addNotification={addNotification} />;
      case 'progress':
        return <ProgressTracker addNotification={addNotification} />;
      case 'scheduled':
        return <ScheduledInterviews />;
      default:
        return <MyDetails profileData={currentUserProfile} addNotification={addNotification} />;
    }
  };

  if (isNewUser) {
    return <RegistrationWizard onComplete={handleRegistrationComplete} addNotification={addNotification} />;
  }

  return (
    <div className="flex bg-[#F8FAFC] font-sans min-h-screen relative overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Ambient Background Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none z-0 animate-float" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-100/20 rounded-full blur-[100px] pointer-events-none z-0 animate-float-delayed" />

      <CandidateSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      <main className="flex-1 overflow-hidden h-screen relative z-10 flex flex-col">
        <DashboardHeader userName={userName} userType={UserType.Candidate} userId={currentUserId} />
        <div className="flex-1 overflow-auto p-8 pt-4 lg:p-12 lg:pt-6 scroll-smooth">
            <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                {renderContent()}
            </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
