
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DemoValues {
  walletBalance: number;
  pendingBalance: number;
  reliabilityScore: number; // 0-100
  notifications: number;
  activeEvent: string;
}

interface DemoContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  demoValues: DemoValues;
}

const DEMO_DEFAULTS: DemoValues = {
  walletBalance: 4500,
  pendingBalance: 1200,
  reliabilityScore: 98, // Elite Status
  notifications: 5,
  activeEvent: "Cairo ICT 2026"
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(false);

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
  };

  return (
    <DemoContext.Provider value={{ isDemoMode, toggleDemoMode, demoValues: DEMO_DEFAULTS }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
