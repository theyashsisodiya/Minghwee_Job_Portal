
import React, { useState } from 'react';
import { Country, CandidateProgress, CandidateApplicationStatus, UserType } from '../../types';
import Onboarding from './components/Onboarding';
import ViewJobs from './components/ViewJobs';
import PostJobForm from './components/PostJobForm';
import JobDetails from './components/JobDetails';
import ScheduledInterviews from './components/ScheduledInterviews';
import EmployerProgressTracker from './components/ProgressTracker';
import Payment from './components/Payment';
import ViewDocuments from './components/ViewDocuments';
import { useGlobalState } from '../../contexts/StateContext';
import DashboardHeader from '../../components/DashboardHeader';

// --- Icons --- //
const PostJobIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ScheduledInterviewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ProgressTrackerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const HelpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export type EmployerPage = 'onboarding' | 'viewJobs' | 'postJob' | 'jobDetails' | 'scheduled' | 'progress' | 'payment' | 'viewDocuments';

interface SidebarProps {
  activeTab: EmployerPage;
  setActiveTab: (tab: EmployerPage) => void;
  onLogout: () => void;
  country: Country;
}

const EmployerSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, country }) => {
  const navItems = [
    { id: 'viewJobs', label: 'My Jobs', icon: <PostJobIcon /> },
    { id: 'scheduled', label: 'Interviews', icon: <ScheduledInterviewIcon /> },
    { id: 'progress', label: 'Pipeline', icon: <ProgressTrackerIcon /> },
  ];
  
  const isActive = (tab: EmployerPage) => {
    if (tab === 'viewJobs') {
      return ['viewJobs', 'postJob', 'jobDetails'].includes(activeTab);
    }
    if (tab === 'progress') {
        return ['progress', 'viewDocuments', 'payment'].includes(activeTab);
    }
    return activeTab === tab;
  }

  return (
    <div className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200 min-h-screen flex flex-col shadow-2xl z-20 relative">
      <div className="p-8 border-b border-gray-100">
        <img src="https://ik.imagekit.io/ui4mpbzoy/removed-background.png?updatedAt=1764657414508" alt="MingHwee" className="h-12 w-auto mb-2" />
        <p className="text-[10px] text-gray-400 mt-2 font-bold tracking-[0.2em] uppercase">Employer Portal</p>
      </div>

      <nav className="flex-grow p-4 space-y-3 mt-4">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as EmployerPage)}
            className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 group relative overflow-hidden ${
              isActive(item.id as EmployerPage)
                ? 'text-purple-700 font-bold bg-purple-50 shadow-sm translate-x-1'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1'
            }`}
          >
            {isActive(item.id as EmployerPage) && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-r-full"></div>
            )}
            <span className={`transition-all duration-300 ${isActive(item.id as EmployerPage) ? 'text-purple-600 scale-110' : 'text-gray-400 group-hover:text-purple-500'}`}>
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

const ReviewPopup = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in zoom-in duration-300">
      <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm border border-gray-100">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6 shadow-sm">
            <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Profile Submitted!</h3>
        <p className="text-gray-600 my-4 text-sm leading-relaxed">
          Your profile and job requirements have been submitted. Our team will review them and post your job shortly.
        </p>
        <button
          onClick={onClose}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-200 transition-all transform hover:-translate-y-0.5"
        >
          Got it
        </button>
      </div>
    </div>
  );

interface EmployerDashboardProps {
  userName: string;
  country: Country;
  onLogout: () => void;
  userEmail?: string;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ userName, country, onLogout, userEmail }) => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<EmployerPage>(isOnboardingComplete ? 'viewJobs' : 'onboarding');
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  
  const [currentEmployerId, setCurrentEmployerId] = useState(1); // Default to mock, updated after onboarding

  const { getApplicationsByEmployer, candidates: globalCandidates, addEmployer, addJobRequirement } = useGlobalState();
  const applications = getApplicationsByEmployer(currentEmployerId); 

  // Transform GlobalApplication to CandidateProgress format for UI compatibility
  const candidateProgressData: CandidateProgress[] = applications.map(app => {
      const candidateProfile = globalCandidates.find(c => c.id === app.candidateId);
      return {
          id: app.id,
          candidateId: app.candidateId,
          name: candidateProfile?.name || 'Unknown Candidate',
          jobTitle: 'Candidate', // Should look up job title based on app.jobId
          avatarUrl: candidateProfile?.avatarUrl || 'https://i.pravatar.cc/150',
          status: app.status,
          steps: app.steps,
          paymentMade: app.paymentMade
      };
  });
 
  const navigate = (page: EmployerPage, candidateId?: number) => {
    if (candidateId) {
        setSelectedCandidateId(candidateId);
    }
    setActiveTab(page);
  };

  const handleOnboardingComplete = (data: any) => {
    // 1. Create Employer Profile
    const newEmployerId = addEmployer({
        name: data.name,
        employerName: data.company || 'Individual Employer',
        email: data.email,
        contact: data.contact
    });
    setCurrentEmployerId(newEmployerId);

    // 2. Submit Job Requirement (Optional fields)
    if (data.role || data.budget || data.details) {
        addJobRequirement({
            employerId: newEmployerId,
            role: data.role,
            budget: data.budget,
            workingHours: data.workingHours,
            details: data.details
        });
    }

    setIsOnboardingComplete(true);
    setShowReviewPopup(true);
    setActiveTab('viewJobs');
  };

  const handlePaymentSuccess = () => {
    if (selectedCandidateId === null) return;
    alert('Payment Successful! You now have full access to the candidate\'s documents.');
    setActiveTab('progress');
  };

  const renderContent = () => {
    const selectedCandidate = selectedCandidateId ? candidateProgressData.find(c => c.id === selectedCandidateId) : null;

    if (!isOnboardingComplete) {
      return <Onboarding onOnboardingComplete={handleOnboardingComplete} country={country} />;
    }
    switch (activeTab) {
      case 'viewJobs':
        return <ViewJobs navigate={(page: any) => setActiveTab(page)} country={country} employerId={currentEmployerId} allowPosting={true} employerEmail={userEmail} />;
      case 'postJob':
        return <PostJobForm country={country} navigate={(page: any) => setActiveTab(page)} employerId={currentEmployerId} employerEmail={userEmail} />;
      case 'jobDetails':
        return <JobDetails onBack={() => navigate('viewJobs')} />;
      case 'scheduled':
        return <ScheduledInterviews />;
      case 'progress':
        return <EmployerProgressTracker navigate={navigate} candidates={candidateProgressData} />;
      case 'payment':
        return <Payment navigate={(page: any) => setActiveTab(page)} onPaymentSuccess={handlePaymentSuccess} candidate={selectedCandidate || null} />;
      case 'viewDocuments':
        return <ViewDocuments navigate={(page: any) => setActiveTab(page)} candidate={selectedCandidate || null} navigateToPayment={() => navigate('payment', selectedCandidate?.id)} />;
      default:
        return <ViewJobs navigate={(page: any) => setActiveTab(page)} country={country} employerId={currentEmployerId} allowPosting={true} employerEmail={userEmail} />;
    }
  };

  return (
    <div className="flex bg-[#F8FAFC] font-sans min-h-screen relative overflow-hidden selection:bg-purple-100 selection:text-purple-900">
      {/* Ambient Background Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-100/30 rounded-full blur-[120px] pointer-events-none z-0 animate-float" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-100/20 rounded-full blur-[100px] pointer-events-none z-0 animate-float-delayed" />

      <EmployerSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} country={country} />
      
      <main className="flex-1 overflow-hidden h-screen relative z-10 flex flex-col">
        <DashboardHeader userName={userName} userType={UserType.Employer} userId={currentEmployerId} />
        <div className="flex-1 overflow-auto p-8 pt-4 lg:p-12 lg:pt-6 scroll-smooth">
            <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                {renderContent()}
                {showReviewPopup && <ReviewPopup onClose={() => setShowReviewPopup(false)} />}
            </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;
