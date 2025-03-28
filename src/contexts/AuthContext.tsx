
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  type: 'user' | 'advocate';
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  signIn: (type: 'user' | 'advocate') => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('nyayasathi_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock sign in - would be replaced with actual Google Auth
  const signIn = async (type: 'user' | 'advocate') => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: type === 'user' ? 'Sample User' : 'Adv. Sample Advocate',
      email: 'user@example.com',
      photoURL: 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff',
      type
    };
    
    setUser(mockUser);
    localStorage.setItem('nyayasathi_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('nyayasathi_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
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
