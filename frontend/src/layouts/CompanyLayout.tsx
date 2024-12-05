//import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/header';
import { Home, FileText, FileSignature } from 'lucide-react';

const companyMenuItems = [
  { label: "Dashboard", icon: Home, link: "/company" },
  { label: "Projects", icon: FileText, link: "/company/projects" },
  { label: "Project Proposal", icon: FileSignature, link: "/company/project-proposal" },
];

export default function CompanyLayout() {
  return (
    <div className="flex h-screen bg-gray-100 flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar menuItems={companyMenuItems} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

