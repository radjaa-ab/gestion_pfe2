import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

const companyMenuItems = [
  { label: "Dashboard", icon: "Home", link: "/company" },
  { label: "Projects", icon: "FileText", link: "/projects" },
  { label: "Project Proposal", icon: "FileSignature", link: "/project-proposal" },
];

export default function CompanyLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar menuItems={companyMenuItems} />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

