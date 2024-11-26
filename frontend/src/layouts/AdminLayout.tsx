import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

const adminMenuItems = [
  { label: "Dashboard", icon: "Home", link: "/admin" },
  { label: "Users", icon: "Users", link: "/users" },
  { label: "Projects", icon: "FileText", link: "/projects" },
  { label: "Schedule", icon: "Calendar", link: "/schedule" },
  { label: "Settings", icon: "Settings", link: "/settings" },
];

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar menuItems={adminMenuItems} />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

