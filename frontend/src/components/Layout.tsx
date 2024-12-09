"use client"

import React from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { SidebarProvider } from "@/components/ui/sidebar"

interface LayoutProps {
  menuItems: Array<{
    label: string;
    icon: React.ElementType;
    link: string;
  }>;
  user?: {
    role: string;
  };
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ menuItems, children }) => {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        {/* Header at the top, full width */}
        <Header />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar on the left, under the header */}
          <Sidebar menuItems={menuItems} />
          
          {/* Main content area */}
          <main className="flex-1 overflow-y-auto bg-background">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

