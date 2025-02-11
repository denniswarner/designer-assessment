'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  fullName: string;
  setFullName: (name: string) => void;
}

const UserContext = createContext<UserContextType>({
  fullName: '',
  setFullName: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available
  const [fullName, setFullNameState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('userName');
      console.log('Initial load from localStorage:', savedName);
      return savedName || '';
    }
    return '';
  });

  // Update localStorage whenever fullName changes
  useEffect(() => {
    console.log('Saving to localStorage:', fullName);
    if (fullName) {
      localStorage.setItem('userName', fullName);
    }
  }, [fullName]);

  const setFullName = (name: string) => {
    console.log('Setting full name:', name);
    setFullNameState(name);
  };

  const value = {
    fullName,
    setFullName,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}