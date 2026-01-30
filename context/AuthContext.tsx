
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { CURRENT_USER } from '../data';

interface AuthContextType {
  user: User;
  role: UserRole;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user] = useState<User>(CURRENT_USER);
  const [role, setRole] = useState<UserRole>('seeker');

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    // In a real app, this might trigger a token refresh or redirect
    console.log(`Switched to ${newRole} mode`);
  };

  return (
    <AuthContext.Provider value={{ user, role, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
