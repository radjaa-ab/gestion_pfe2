import React, { createContext, useContext, useState, useCallback } from 'react';

type SidebarState = "expanded" | "collapsed";

interface SidebarContextType {
  state: SidebarState;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [state, setState] = useState<SidebarState>("expanded");

  const toggleSidebar = useCallback(() => {
    setState(prevState => prevState === "expanded" ? "collapsed" : "expanded");
  }, []);

  const value = { state, toggleSidebar };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

