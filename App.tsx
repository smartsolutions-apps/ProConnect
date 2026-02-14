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
import { CompanyView } from './views/CompanyView';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { Header } from './components/layout/Header';

function AppContent() {
  const { role } = useAuth();
  const { lang } = useParams();
  const location = useLocation();

  // Validate language or fallback
  const supportedLangs = ['en', 'ar'];
  if (!lang || !supportedLangs.includes(lang)) {
    return <Navigate to="/en/" replace state={{ from: location }} />;
  }

  // Admin View Logic
  if (role === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#121212] transition-colors duration-300">
        <Header 
            user={CURRENT_USER} activeTab={'settings'} setActiveTab={() => {}} 
            isStealthMode={false} toggleStealthMode={() => {}}
        />
        <main className="max-w-6xl mx-auto px-4 py-6">
            <AdminDashboard />
        </main>
        <RoleSwitcher />
      </div>
    );
  }

  // Company View Logic
  if (role === 'company') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#121212] transition-colors duration-300">
        <CompanyView user={CURRENT_USER} />
        <RoleSwitcher />
      </div>
    );
  }

  // Default Seeker View
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] transition-colors duration-300">
      <JobSeekerView user={CURRENT_USER} />
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