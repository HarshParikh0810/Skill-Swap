import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User } from '../types';
import { currentUser } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoggedIn: false,
    isAdmin: false,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login logic
    if (email === 'admin@skillswap.com' && password === 'admin123') {
      setAuthState({
        user: { ...currentUser, name: 'Admin User', email },
        isLoggedIn: true,
        isAdmin: true,
      });
      return true;
    } else if (email && password) {
      setAuthState({
        user: currentUser,
        isLoggedIn: true,
        isAdmin: false,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isLoggedIn: false,
      isAdmin: false,
    });
  };

  const updateUser = (user: User) => {
    setAuthState(prev => ({
      ...prev,
      user,
    }));
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};