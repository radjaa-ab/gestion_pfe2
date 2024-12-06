import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/header';
import { Home, FileText, Calendar, MessageSquare, ClipboardList, FileSignature } from 'lucide-react';

const teacherMenuItems = [
  { label: "Dashboard", icon: Home, link: "/teacher" },
  { label: "Projects", icon: FileText, link: "/teacher/projects" },
  { label: "Schedule", icon: Calendar, link: "/teacher/schedule" },
  { label: "Feedback", icon: MessageSquare, link: "/teacher/feedback-submission" },
  { label: "Progress Reports", icon: ClipboardList, link: "/teacher/progress-report" },
  { label: "Project Proposals", icon: FileSignature, link: "/teacher/project-proposal" },
];

export default function TeacherLayout() {
  return (
    <div className="flex h-screen bg-gray-100 flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar menuItems={teacherMenuItems} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

