
import React, { useState } from 'react';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DemoProvider } from './context/DemoContext';
import { RoleSwitcher } from './components/dev/RoleSwitcher';
import { ProfileWizard } from './features/profile/ProfileWizard';
import { CURRENT_USER } from './data';

// Views
import { JobSeekerView } from './views/JobSeekerView';
import { CompanyView } from './views/CompanyView';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { Header } from './components/layout/Header';

function AppContent() {
  const { role } = useAuth();
  const [isOnboarding, setIsOnboarding] = useState(true);

  // 1. Onboarding Check
  if (isOnboarding) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              ProConnect<span className="text-brand-600">.eg</span>
            </h1>
            <p className="text-gray-500">Egypt's Professional Network</p>
          </div>
          <ProfileWizard onComplete={() => setIsOnboarding(false)} />
        </div>
      </div>
    );
  }

  // 2. Role-Based Routing
  return (
    <>
      {role === 'admin' && (
        <div className="min-h-screen bg-[#F3F4F6]">
            <Header 
                user={CURRENT_USER} activeTab={'settings'} setActiveTab={() => {}} 
                isStealthMode={false} toggleStealthMode={() => {}}
            />
            <main className="max-w-6xl mx-auto px-4 py-6">
                <AdminDashboard />
            </main>
        </div>
      )}
      
      {role === 'company' && <CompanyView user={CURRENT_USER} />}
      
      {role === 'seeker' && <JobSeekerView user={CURRENT_USER} />}

      <RoleSwitcher />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <DemoProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </DemoProvider>
    </ErrorBoundary>
  );
}
