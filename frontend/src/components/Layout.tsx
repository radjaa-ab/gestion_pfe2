import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { SidebarInset } from "@/components/ui/sidebar"

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
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuItems} />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          {children || <Outlet />}
        </main>
      </SidebarInset>
    </div>
  );
};

