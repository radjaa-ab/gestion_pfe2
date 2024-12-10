"use client"

import React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Sidebar } from "./sidebar"
import { useAuth } from "@/hooks/useAuth"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { Header } from "./header"
import { SidebarProvider } from "@/components/ui/sidebar"

interface LayoutProps {
  menuItems: Array<{
    label: string;
    icon: React.ElementType;
    link: string;
  }>;
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ menuItems, children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        {children || <Outlet />}
        <Toaster />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
        <Header user={user} /> {/* Pass user prop to Header */}

        <div className="flex flex-1 overflow-hidden pt-16">
          <Sidebar menuItems={menuItems} />

          <main className={cn(
            "flex-1 overflow-y-auto p-6",
            "transition-all duration-300 ease-in-out",
            "bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
          )}>
            <div className="container mx-auto max-w-7xl">
              {children || <Outlet />}
            </div>
          </main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default Layout;

