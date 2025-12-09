
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
    { id: 'myDetails', label: 'My Details', icon: <UserIcon /> },
    { id: 'invites', label: 'Interview Invites', icon: <MailIcon /> },
    { id: 'progress', label: 'Progress Tracker', icon: <ChartBarIcon /> },
    { id: 'scheduled', label: 'Scheduled Interviews', icon: <CalendarIcon /> },
  ];

  return (
    <div className="w-64 bg-white min-h-screen flex flex-col p-4 border-r border-gray-200">
      <div className="mb-10 px-2">
        <div className="text-2xl font-bold text-gray-800">MingHwee</div>
      </div>
      <p className="text-xs text-gray-500 mb-4 uppercase font-bold px-4">Candidate Dashboard</p>
      <nav className="flex-grow space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left transition-colors duration-200 ${
              activeTab === item.id 
                ? 'bg-blue-100 text-blue-700 font-semibold' 
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
          className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <LogoutIcon />
          <span>Log out</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors duration-200"
        >
          <HelpIcon />
          <span>Help</span>
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
    <div className="flex bg-gray-100">
      <CandidateSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      <main className="flex-1 overflow-auto h-screen">
        <DashboardHeader userName={userName} userType={UserType.Candidate} userId={currentUserId} />
        <div className="px-8 pb-8">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
