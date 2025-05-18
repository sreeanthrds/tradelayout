
import React, { createContext, useEffect, useState } from 'react';
import { AuthContextType, User, AuthResult } from './types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!user;

  // Check if a user is stored in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('app_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('app_user');
      }
    }
    
    console.log('AuthProvider mounted, context created');
    return () => console.log('AuthProvider unmounted');
  }, []);

  // Simple mock auth functions
  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      // For demo purposes, accept any email/password
      const mockUser = {
        id: `user-${Date.now()}`,
        email
      };
      
      setUser(mockUser);
      localStorage.setItem('app_user', JSON.stringify(mockUser));
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'An error occurred during sign in' };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      // For demo purposes, create a user with any email/password
      const mockUser = {
        id: `user-${Date.now()}`,
        email
      };
      
      setUser(mockUser);
      localStorage.setItem('app_user', JSON.stringify(mockUser));
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'An error occurred during sign up' };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    try {
      setUser(null);
      localStorage.removeItem('app_user');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithProvider = async (provider: 'google' | 'facebook'): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      // Create a mock social user
      const mockUser = {
        id: `${provider}-user-${Date.now()}`,
        email: `${provider}.user@example.com`
      };
      
      setUser(mockUser);
      localStorage.setItem('app_user', JSON.stringify(mockUser));
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || `Failed to sign in with ${provider}` };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    signInWithProvider
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
