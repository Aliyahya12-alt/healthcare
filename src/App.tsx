import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import DoctorDashboard from '@/pages/DoctorDashboard';
import PatientDashboard from '@/pages/PatientDashboard';
import AdminPanel from '@/pages/AdminPanel';
import type { UserRole } from '@/types';

type Page = 'landing' | 'auth' | 'doctor-dashboard' | 'patient-dashboard' | 'admin-panel';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authRole, setAuthRole] = useState<UserRole>('patient');
  const { user, isAuthenticated, logout } = useAuthStore();

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleAuthClick = (mode: 'login' | 'signup', role: UserRole = 'patient') => {
    setAuthMode(mode);
    setAuthRole(role);
    setCurrentPage('auth');
  };

  const handleAuthSuccess = () => {
    if (user?.role === 'doctor') {
      setCurrentPage('doctor-dashboard');
    } else if (user?.role === 'admin') {
      setCurrentPage('admin-panel');
    } else {
      setCurrentPage('patient-dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('landing');
  };

  // Render the appropriate page
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage
            onFindDoctor={() => handleAuthClick('login', 'patient')}
            onJoinAsDoctor={() => handleAuthClick('signup', 'doctor')}
            onLogin={() => handleAuthClick('login')}
            isAuthenticated={isAuthenticated}
            onNavigateToDashboard={() => {
              if (user?.role === 'doctor') navigateTo('doctor-dashboard');
              else if (user?.role === 'admin') navigateTo('admin-panel');
              else navigateTo('patient-dashboard');
            }}
          />
        );
      case 'auth':
        return (
          <AuthPage
            initialMode={authMode}
            initialRole={authRole}
            onBack={() => setCurrentPage('landing')}
            onSuccess={handleAuthSuccess}
          />
        );
      case 'doctor-dashboard':
        return <DoctorDashboard onLogout={handleLogout} onNavigateHome={() => navigateTo('landing')} />;
      case 'patient-dashboard':
        return <PatientDashboard onLogout={handleLogout} onNavigateHome={() => navigateTo('landing')} />;
      case 'admin-panel':
        return <AdminPanel onLogout={handleLogout} onNavigateHome={() => navigateTo('landing')} />;
      default:
        return <LandingPage onFindDoctor={() => handleAuthClick('login')} onJoinAsDoctor={() => handleAuthClick('signup', 'doctor')} onLogin={() => handleAuthClick('login')} isAuthenticated={isAuthenticated} onNavigateToDashboard={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
    </div>
  );
}

export default App;
