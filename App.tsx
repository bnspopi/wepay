import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Wallet, LayoutDashboard, UserCheck, ShieldCheck, Home, LogOut, Search, Send } from 'lucide-react';
import { welfareService } from './services/welfareService';
import { authService } from './services/authService';
import WalletPage from './pages/WalletPage';
import WelfareSchemesPage from './pages/WelfareSchemesPage';
import AgentPortal from './pages/AgentPortal';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EligibilityPage from './pages/EligibilityPage';
import TransactionPage from './pages/TransactionPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import WelfarePage from './pages/WelfarePage';


import { LanguageProvider } from './i18n/languageContext';
import { LocationProvider } from './contexts/LocationContext';
import { useTranslation } from './hooks/useTranslation';
import { useLocation } from './contexts/LocationContext';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const isMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';

        if (token) {
          const userData = await authService.getMe();
          setUser(userData);
          welfareService.setUser(userData);
        } else if (isMock) {
          welfareService.initializeMock();
          const mockUser = welfareService.getUser();
          setUser(mockUser);
        } else {
          // No token and not mock mode - ensure everything is cleared
          authService.logout();
          setUser(null);
        }
      } catch (error: any) {
        // Only log if it's not a 401/404 which just means session is invalid
        if (error.response?.status !== 401 && error.response?.status !== 404) {
          console.error('Auth init failed:', error);
        }
        authService.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const handleOnline = () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        welfareService.syncOfflineTransactions();
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);


  const handleLogout = () => {
    authService.logout();
    setUser(null);
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <LocationProvider>
      <LanguageProvider>
        <AppWrapper user={user} handleLogout={handleLogout} />
      </LanguageProvider>
    </LocationProvider>
  );
}

function AppWrapper({ user, handleLogout }: { user: any; handleLogout: () => void }) {
  const { lang } = useTranslation();
  return <AppContent key={lang} user={user} handleLogout={handleLogout} />;
}

function AppContent({ user, handleLogout }: { user: any; handleLogout: () => void }) {
  const { t } = useTranslation();
  const { address, error: locationError, loading: locationLoading } = useLocation();

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {!user ? (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <>
            {/* Main Content Area */}
            <main className="flex-1 pb-20 md:pb-0 md:pl-64">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route path="/eligibility" element={<EligibilityPage />} />
                <Route path="/transaction" element={<TransactionPage />} />
                <Route path="/transactions" element={<TransactionHistoryPage />} />
                <Route path="/welfare" element={<WelfarePage />} />
                <Route path="/schemes" element={<WelfareSchemesPage />} />
                <Route path="/agent" element={<AgentPortal />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Mobile Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 md:hidden z-50">
              <NavItem to="/" icon={<Home className="w-6 h-6" />} label={t('home')} />
              <NavItem to="/wallet" icon={<Wallet className="w-6 h-6" />} label={t('wallet')} />
              <NavItem to="/welfare" icon={<LayoutDashboard className="w-6 h-6" />} label={t('welfareDashboard')} />
              <NavItem to="/agent" icon={<UserCheck className="w-6 h-6" />} label={t('agentPortal')} />
            </nav>

            {/* Desktop Sidebar */}
            <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 flex-col p-4 z-50">
              <div className="flex items-center gap-2 mb-8 px-2">
                <img 
                  src="/logos/full-Screenshot_2026-02-26_020011.png" 
                  alt="GramSwaraj DID" 
                  className="h-8 w-auto object-contain"
                />
              </div>

              <div className="space-y-2">
                <DesktopNavItem to="/" icon={<Home className="w-5 h-5" />} label={t('home')} />
                <DesktopNavItem to="/wallet" icon={<Wallet className="w-5 h-5" />} label={t('wallet')} />
                <DesktopNavItem to="/eligibility" icon={<Search className="w-5 h-5" />} label={t('eligibility')} />
                <DesktopNavItem to="/transaction" icon={<Send className="w-5 h-5" />} label={t('sendMoney')} />
                <DesktopNavItem to="/welfare" icon={<LayoutDashboard className="w-5 h-5" />} label={t('welfareDashboard')} />
                <DesktopNavItem to="/schemes" icon={<ShieldCheck className="w-5 h-5" />} label={t('welfare')} />
                <DesktopNavItem to="/agent" icon={<UserCheck className="w-5 h-5" />} label={t('agentPortal')} />
              </div>

              <div className="mt-auto p-4 bg-indigo-50 rounded-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold uppercase">
                    {user?.name?.[0]}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{locationLoading ? t('detectingLocation') : (locationError || address || t(user?.location || 'India'))}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  {t('logout')}
                </button>
              </div>
            </nav>
          </>
        )}
      </div>
    </Router>
  );
}




function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
          isActive ? 'text-indigo-600' : 'text-slate-500'
        }`
      }
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
  );
}

function DesktopNavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          isActive 
            ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
            : 'text-slate-600 hover:bg-slate-50'
        }`
      }
    >
      {icon}
      <span className="text-sm">{label}</span>
    </NavLink>
  );
}

export default App;