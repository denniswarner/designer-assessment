// File: src/context/UserContext.tsx
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
  // Initialize state from localStorage if available
  const [fullName, setFullNameState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userName') || '';
    }
    return '';
  });

  // Update localStorage when fullName changes
  const setFullName = (name: string) => {
    setFullNameState(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem('userName', name);
    }
  };

  return (
    <UserContext.Provider value={{ fullName, setFullName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}