
import React, { useState } from 'react';
import { Country, CandidateProgress, CandidateApplicationStatus } from '../../types';
import Onboarding from './components/Onboarding';
import ViewJobs from './components/ViewJobs';
import JobDetails from './components/JobDetails';
import ScheduledInterviews from './components/ScheduledInterviews';
import EmployerProgressTracker from './components/ProgressTracker';
import Payment from './components/Payment';
import ViewDocuments from './components/ViewDocuments';
import { useGlobalState } from '../../contexts/StateContext';

// --- Icons --- //
const PostJobIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ScheduledInterviewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ProgressTrackerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const HelpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export type EmployerPage = 'onboarding' | 'viewJobs' | 'jobDetails' | 'scheduled' | 'progress' | 'payment' | 'viewDocuments';

interface SidebarProps {
  activeTab: EmployerPage;
  setActiveTab: (tab: EmployerPage) => void;
  onLogout: () => void;
  country: Country;
}

const EmployerSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, country }) => {
  const navItems = [
    { id: 'viewJobs', label: 'View Jobs', icon: <PostJobIcon /> },
    { id: 'scheduled', label: 'Scheduled Interview', icon: <ScheduledInterviewIcon /> },
    { id: 'progress', label: 'Progress Tracker', icon: <ProgressTrackerIcon /> },
  ];
  
  const isActive = (tab: EmployerPage) => {
    if (tab === 'viewJobs') {
      return ['viewJobs', 'jobDetails'].includes(activeTab);
    }
    if (tab === 'progress') {
        return ['progress', 'viewDocuments', 'payment'].includes(activeTab);
    }
    return activeTab === tab;
  }

  return (
    <div className="w-72 bg-white min-h-screen flex flex-col p-4 border-r border-gray-200">
      <div className="mb-10 flex items-center space-x-2">
        <div className="text-2xl font-bold text-gray-800">MingHwee</div>
      </div>
      <p className="text-sm text-gray-500 mb-4 uppercase font-semibold">Employer Dashboard</p>
      <nav className="flex-grow">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as EmployerPage)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
              isActive(item.id as EmployerPage)
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
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-500 hover:bg-red-50 transition-colors duration-200"
        >
          <LogoutIcon />
          <span>Log out</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors duration-200">
          <HelpIcon />
          <span>Help</span>
        </button>
      </div>
    </div>
  );
};

const ReviewPopup = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Profile Submitted!</h3>
        <p className="text-gray-600 my-4">
          Your profile has been submitted for review. We will notify you once it's approved.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
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
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ userName, country, onLogout }) => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<EmployerPage>(isOnboardingComplete ? 'viewJobs' : 'onboarding');
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  
  const currentEmployerId = 1; // Mocked ID for the currently logged-in employer

  const { getApplicationsByEmployer, candidates: globalCandidates } = useGlobalState();
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

  const handleOnboardingComplete = () => {
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
        return <ViewJobs navigate={(page: any) => setActiveTab(page)} country={country} employerId={currentEmployerId} allowPosting={false} />;
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
        return <ViewJobs navigate={(page: any) => setActiveTab(page)} country={country} employerId={currentEmployerId} allowPosting={false} />;
    }
  };

  return (
    <div className="flex bg-gray-50">
      <EmployerSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} country={country} />
      <main className="flex-1 p-8 overflow-auto h-screen">
        {renderContent()}
        {showReviewPopup && <ReviewPopup onClose={() => setShowReviewPopup(false)} />}
      </main>
    </div>
  );
};

export default EmployerDashboard;
