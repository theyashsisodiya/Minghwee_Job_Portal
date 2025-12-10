
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, Outlet } from 'react-router-dom';
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

// Protected Route Component
const ProtectedRoute = ({ allowedTypes }: { allowedTypes?: UserType[] }) => {
    const userStr = localStorage.getItem('userData');
    const user = userStr ? JSON.parse(userStr) : null;
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedTypes && !allowedTypes.includes(user.type)) {
        // Redirect to appropriate dashboard if logged in but wrong role
        switch(user.type) {
            case UserType.Candidate: return <Navigate to="/dashboard/candidate" replace />;
            case UserType.Employer: return <Navigate to="/dashboard/employer" replace />;
            case UserType.Admin: return <Navigate to="/dashboard/admin" replace />;
            case UserType.Sales: return <Navigate to="/dashboard/sales" replace />;
            default: return <Navigate to="/" replace />;
        }
    }

    return <Outlet />;
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ type: UserType; name: string; email?: string } | null>(() => {
      const saved = localStorage.getItem('userData');
      return saved ? JSON.parse(saved) : null;
  });
  
  const [country, setCountry] = useState<Country | null>(null);
  const [isNewUser, setIsNewUser] = useState(true); // This could also be persisted if needed
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Automatically detect location on mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch('https://get.geojs.io/v1/ip/country.json');
        if (!response.ok) {
            setCountry(Country.Singapore);
            return;
        }
        const data = await response.json();
        console.log("Detected Country Code:", data.country);

        if (data.country === 'SG') {
          setCountry(Country.Singapore);
        } else if (data.country === 'PH') {
          setCountry(Country.Philippines);
        } else {
          setCountry(Country.Singapore);
        }
      } catch (error) {
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

  const handleLogin = (userType: UserType, name: string, email?: string) => {
    const userData = { type: userType, name, email };
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Redirect based on user type
    switch(userType) {
        case UserType.Candidate: navigate('/dashboard/candidate'); break;
        case UserType.Employer: navigate('/dashboard/employer'); break;
        case UserType.Admin: navigate('/dashboard/admin'); break;
        case UserType.Sales: navigate('/dashboard/sales'); break;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    navigate('/');
  };
  
  const handleProfileComplete = () => {
    setIsNewUser(false);
    addNotification('Profile completed successfully! You have been auto-matched with relevant jobs.', 'success');
  };

  const handleSetCountry = (selectedCountry: Country) => {
    setCountry(selectedCountry);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage setCountry={handleSetCountry} selectedCountry={country} />} />
            <Route path="/about" element={<AboutPage setCountry={handleSetCountry} selectedCountry={country} />} />
            <Route path="/contact" element={<ContactPage setCountry={handleSetCountry} selectedCountry={country} />} />
            <Route path="/pricing" element={<PricingPage setCountry={handleSetCountry} selectedCountry={country} />} />
            <Route path="/login" element={<AuthPage initialCountry={country} onAuthSuccess={handleLogin} />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute allowedTypes={[UserType.Candidate]} />}>
                <Route path="/dashboard/candidate" element={
                    <CandidateDashboard 
                        userName={user?.name || 'Candidate'} 
                        onLogout={handleLogout} 
                        isNewUser={isNewUser} 
                        onProfileComplete={handleProfileComplete} 
                        addNotification={addNotification} 
                    />
                } />
            </Route>

            <Route element={<ProtectedRoute allowedTypes={[UserType.Employer]} />}>
                <Route path="/dashboard/employer" element={
                    <EmployerDashboard 
                        userName={user?.name || 'Employer'} 
                        country={country!} 
                        onLogout={handleLogout} 
                        userEmail={user?.email} 
                    />
                } />
            </Route>

            <Route element={<ProtectedRoute allowedTypes={[UserType.Admin]} />}>
                <Route path="/dashboard/admin" element={
                    <AdminDashboard 
                        userName={user?.name || 'Admin'} 
                        onLogout={handleLogout} 
                    />
                } />
            </Route>

            <Route element={<ProtectedRoute allowedTypes={[UserType.Sales]} />}>
                <Route path="/dashboard/sales" element={
                    <SalesDashboard 
                        userName={user?.name || 'Sales'} 
                        onLogout={handleLogout} 
                    />
                } />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

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
