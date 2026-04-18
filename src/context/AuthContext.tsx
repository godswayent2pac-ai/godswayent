import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role } from '@/types';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('godsway-auth');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, role: string) => {
    setIsLoading(true);
    // Mimic API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser: User = {
      id: 'u-' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role: role as Role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    
    setUser(newUser);
    localStorage.setItem('godsway-auth', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('godsway-auth');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
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
