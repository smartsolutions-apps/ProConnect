
import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { FeedContainer } from '../features/feed/FeedContainer';
import { JobBoard } from '../features/jobs/JobBoard';
import { SettingsHub } from '../features/settings/SettingsHub';
import { ApplicationsDashboard } from '../features/applications/ApplicationsDashboard';
import { EventHub } from '../features/events/EventHub';
import { ShiftScanner } from '../features/shifts/ShiftScanner';
import { EventRankings } from '../features/gamification/EventRankings';
import { ImproveHub } from '../features/improve/ImproveHub';
import { User } from '../types';
import { useLocation } from 'react-router-dom'; // Fixed import location

interface JobSeekerViewProps {
  user: User;
}

export const JobSeekerView: React.FC<JobSeekerViewProps> = ({ user }) => {
  const location = useLocation();
  const initialTab = location.pathname.includes('/jobs') ? 'jobs' : 'feed';

  // Added 'rankings' and 'improve' to tab state
  const [activeTab, setActiveTab] = useState<'feed' | 'jobs' | 'events' | 'profile' | 'settings' | 'applications' | 'scan' | 'rankings' | 'improve'>(initialTab as any);
  const [isStealthMode, setIsStealthMode] = useState(false);

  // Determine when to hide the left sidebar (e.g. on full-width settings pages)
  const isWidePage = activeTab === 'settings' || activeTab === 'profile' || activeTab === 'rankings' || activeTab === 'improve';

  return (
    <MainLayout
      user={user}
      activeTab={activeTab as any}
      setActiveTab={setActiveTab}
      isStealthMode={isStealthMode}
      toggleStealthMode={() => setIsStealthMode(!isStealthMode)}
      hideLeftSidebar={isWidePage}
      focusMode={activeTab === 'jobs'}
    >
      {activeTab === 'feed' && <FeedContainer user={user} />}
      {activeTab === 'jobs' && <JobBoard />}
      {activeTab === 'events' && <EventHub />}
      {activeTab === 'applications' && <ApplicationsDashboard />}
      {activeTab === 'profile' && <SettingsHub />}
      {activeTab === 'settings' && <SettingsHub />}
      {activeTab === 'rankings' && <EventRankings />}
      {activeTab === 'improve' && <ImproveHub user={user} />}

      {/* Scanner Overlay */}
      {activeTab === 'scan' && (
        <ShiftScanner
          onClose={() => setActiveTab('feed')}
          onSuccess={() => setActiveTab('feed')}
        />
      )}
    </MainLayout>
  );
};
