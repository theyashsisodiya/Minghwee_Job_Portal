
import React, { useState, useEffect } from 'react';
import { Page, UserType, Country, Notification } from './types';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import SalesDashboard from './pages/sales/SalesDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import { StateProvider } from './contexts/StateContext';

const Toast: React.FC<{ notification: Notification; onDismiss: (id: number) => void }> = ({ notification, onDismiss }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[notification.type];

  return (
    <div className={`w-full max-w-sm rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${bgColor}`}>
      <div className="p-4">
        <div className="flex items-center">
          <div className="w-0 flex-1 flex justify-between">
            <p className="w-0 flex-1 text-sm font-medium text-white">{notification.message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button onClick={() => onDismiss(notification.id)} className="inline-flex text-white">
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.Home);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<{ type: UserType; name: string } | null>(null);
  const [country, setCountry] = useState<Country | null>(null);
  const [loginUserType, setLoginUserType] = useState<UserType>(UserType.Candidate);
  const [isNewUser, setIsNewUser] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Automatically detect location on mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Using get.geojs.io which is CORS-friendly and free
        const response = await fetch('https://get.geojs.io/v1/ip/country.json');
        
        if (!response.ok) {
            // Silently fallback to default
            setCountry(Country.Singapore);
            return;
        }

        const data = await response.json();
        // Returns 2-letter ISO code (e.g., "SG", "PH")
        console.log("Detected Country Code:", data.country);

        if (data.country === 'SG') {
          setCountry(Country.Singapore);
        } else if (data.country === 'PH') {
          setCountry(Country.Philippines);
        } else {
          // Default to Singapore for any other location
          setCountry(Country.Singapore);
        }
      } catch (error) {
        // Fallback to Singapore on any network/parsing error
        setCountry(Country.Singapore); 
      }
    };

    if (!country) {
      detectCountry();
    }
  }, []);

  const addNotification = (message: string, type: Notification['type']) => {
    setNotifications(prev => [...prev, { id: Date.now(), message, type }]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleLogin = (userType: UserType, name: string) => {
    setIsLoggedIn(true);
    setUser({ type: userType, name: name });
    setPage(Page.Dashboard);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setPage(Page.Home);
  };
  
  const handleProfileComplete = () => {
    setIsNewUser(false);
    addNotification('Profile completed successfully! You have been auto-matched with relevant jobs.', 'success');
  };

  const handleSetCountry = (selectedCountry: Country) => {
    setCountry(selectedCountry);
  };
 
  const navigateTo = (newPage: Page, options?: { userType?: UserType }) => {
    if (options?.userType) {
        setLoginUserType(options.userType);
    }
    setPage(newPage);
  }

  const renderPage = () => {
    if (isLoggedIn) {
        if (user?.type === UserType.Candidate) {
            return <CandidateDashboard userName={user.name} onLogout={handleLogout} isNewUser={isNewUser} onProfileComplete={handleProfileComplete} addNotification={addNotification} />;
        }
        if (user?.type === UserType.Employer) {
            return <EmployerDashboard userName={user.name} country={country!} onLogout={handleLogout} />;
        }
        if (user?.type === UserType.Admin) {
            return <AdminDashboard userName={user.name} onLogout={handleLogout} />;
        }
        if (user?.type === UserType.Sales) {
            return <SalesDashboard userName={user.name} onLogout={handleLogout} />;
        }
    }
   
    switch (page) {
      case Page.Home:
        return <HomePage navigateTo={navigateTo} setCountry={handleSetCountry} selectedCountry={country} />;
      case Page.Login:
        return <AuthPage initialCountry={country} onAuthSuccess={handleLogin} navigateTo={navigateTo} initialUserType={loginUserType} />;
      case Page.About:
        return <AboutPage navigateTo={navigateTo} setCountry={handleSetCountry} selectedCountry={country} />;
      case Page.Contact:
        return <ContactPage navigateTo={navigateTo} setCountry={handleSetCountry} selectedCountry={country} />;
      case Page.Pricing:
        return <PricingPage navigateTo={navigateTo} setCountry={handleSetCountry} selectedCountry={country} />;
      default:
        return <HomePage navigateTo={navigateTo} setCountry={handleSetCountry} selectedCountry={country} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
        {renderPage()}
        <div aria-live="assertive" className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-[100]">
            <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                {notifications.map(n => (
                    <Toast key={n.id} notification={n} onDismiss={removeNotification} />
                ))}
            </div>
        </div>
    </div>
  );
};

const App: React.FC = () => {
    return (
        <StateProvider>
            <AppContent />
        </StateProvider>
    )
}

export default App;
