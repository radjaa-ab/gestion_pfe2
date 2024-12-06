"use client"

import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Header } from './header'
import {
  SidebarProvider,
} from "@/components/ui/sidebar"

interface LayoutProps {
  menuItems: Array<{
    label: string;
    icon: React.ElementType;
    link: string;
  }>;
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ menuItems, children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar menuItems={menuItems} />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-6">
              {children || <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

