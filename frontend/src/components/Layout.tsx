"use client";

import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { SidebarProvider } from "@/components/ui/sidebar";

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
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar menuItems={menuItems} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-background">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

