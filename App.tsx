import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DemoProvider } from './context/DemoContext';
import { ThemeProvider } from './context/ThemeProvider';
import { DataHydrationProvider } from './context/DataHydrationContext';
import { RoleSwitcher } from './components/dev/RoleSwitcher';
import { CURRENT_USER } from './data';

// Views
import { JobSeekerView } from './views/JobSeekerView';

import { Header } from './components/layout/Header';
import { CompanyProfileView } from './features/company/CompanyProfileView';
import { JobStandaloneView } from './features/jobs/JobStandaloneView';
import { UserSettingsView } from './features/settings/UserSettingsView';
import { AdminCommandCenter } from './features/admin/AdminCommandCenter'; // Updated import
import { RecruiterDashboard } from './features/recruiter/RecruiterDashboard';
import { AdminSettings } from './features/admin/AdminSettings';
import { PlatformTour } from './features/landing/PlatformTour';

function AppContent() {
  const { role } = useAuth();
  const { lang } = useParams();
  const location = useLocation();

  // Validate language or fallback
  const supportedLangs = ['en', 'ar'];
  if (!lang || !supportedLangs.includes(lang)) {
    return <Navigate to="/en/" replace state={{ from: location }} />;
  }

  // Admin Route Protection & Redirection
  if (location.pathname.includes('/admin') && role !== 'admin') {
    // If user is not admin but tries to access admin, redirect to home
    return <Navigate to={`/${lang}/`} replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] transition-colors duration-300">
      <Routes>
        {/* Public / Seeker Routes */}
        <Route path="/" element={<JobSeekerView user={CURRENT_USER} />} />
        <Route path="jobs" element={<JobSeekerView user={CURRENT_USER} />} />
        <Route path="jobs/:slug" element={<JobSeekerView user={CURRENT_USER} />} />
        <Route path="job/:slug" element={<JobStandaloneView />} />

        {/* Company Routes */}
        <Route path="companies/:slug" element={<CompanyProfileView />} />
        <Route path="recruiter" element={<RecruiterDashboard />} />
        <Route path="tour" element={<PlatformTour />} />
        {/* If we want a generic company dashboard route, we can add it here, 
            but for now keeping it simple as per request */}

        {/* Protected Routes */}
        <Route path="settings" element={<UserSettingsView />} />

        {/* Admin Route */}
        <Route path="admin" element={
          role === 'admin'
            ? (
              <div className="min-h-screen bg-slate-50 dark:bg-[#121212]">
                <Header
                  user={CURRENT_USER}
                  activeTab='settings' // Admin usually implies settings/config context
                  setActiveTab={() => { }}
                  isStealthMode={false}
                  toggleStealthMode={() => { }}
                />
                <main className="max-w-6xl mx-auto px-4 py-6">
                  <AdminCommandCenter />
                </main>
                <RoleSwitcher />
              </div>
            )
            : <Navigate to={`/${lang}/`} replace />
        } />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>

      {/* Role Switcher is global for dev */}
      <RoleSwitcher />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <DataHydrationProvider>
          <DemoProvider>
            <AuthProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/:lang/*" element={<AppContent />} />
                  <Route path="/" element={<Navigate to="/en/" replace />} />
                  <Route path="*" element={<Navigate to="/en/" replace />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </DemoProvider>
        </DataHydrationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}