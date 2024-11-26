/*import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './header';
import { SidebarProvider } from '@/components/ui/sidebar';

interface LayoutProps {
  hideSidebar?: boolean;
  children?: React.ReactNode;
}

export function Layout({ hideSidebar = false, children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {!hideSidebar && <Sidebar />}
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-6">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

*/