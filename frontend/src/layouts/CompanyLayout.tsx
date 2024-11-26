import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/header'; // Correct casing for Header import

const companyMenuItems = [
  { label: "Dashboard", icon: "Home", link: "/company" },
  { label: "Projects", icon: "FileText", link: "/projects" },
  { label: "Project Proposal", icon: "FileSignature", link: "/project-proposal" },
];

export default function CompanyLayout() {
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Header spans the top */}
      <Header />
      
      {/* Sidebar and main content */}
      <div className="flex flex-1">
        <Sidebar menuItems={companyMenuItems} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
