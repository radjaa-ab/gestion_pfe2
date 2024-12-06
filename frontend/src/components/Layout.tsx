"use client"

import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Header } from './header'
import {
  SidebarInset,
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
      <div className="fixed inset-0 flex">
        <Sidebar menuItems={menuItems} />
        <SidebarInset className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-y-auto bg-background">
            <div className="container p-6">
              {children || <Outlet />}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

