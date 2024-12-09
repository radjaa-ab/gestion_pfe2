import React from 'react';
import { SidebarProvider as UISidebarProvider } from "@/components/ui/sidebar"

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  return (
    <UISidebarProvider defaultOpen={true}>
      {children}
    </UISidebarProvider>
  );
};

