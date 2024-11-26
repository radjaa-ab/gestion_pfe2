import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/header'; 

const teacherMenuItems = [
  { label: "Dashboard", icon: "Home", link: "/teacher" },
  { label: "Projects", icon: "FileText", link: "/projects" },
  { label: "Schedule", icon: "Calendar", link: "/schedule" },
  { label: "Feedback", icon: "MessageSquare", link: "/feedback-submission" },
  { label: "Progress Reports", icon: "ClipboardList", link: "/progress-report" },
  { label: "Project Proposals", icon: "FileSignature", link: "/project-proposal" },
];

export default function TeacherLayout() {
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <Header /> {/* Header added */}
      <div className="flex flex-1">
        <Sidebar menuItems={teacherMenuItems} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
