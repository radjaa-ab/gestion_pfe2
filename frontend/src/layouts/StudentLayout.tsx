import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/header';
import { Home, FileText, Calendar, ClipboardList, FileSignature, Users, Upload, Star } from 'lucide-react';

const studentMenuItems = [
  { label: "Dashboard", icon: Home, link: "/student" },
  { label: "Projects", icon: FileText, link: "/student/projects" },
  { label: "Schedule", icon: Calendar, link: "/student/schedule" },
  { label: "Progress Report", icon: ClipboardList, link: "/student/progress-report" },
  { label: "Project Proposal", icon: FileSignature, link: "/student/project-proposal" },
  { label: "Team Formation", icon: Users, link: "/student/team-formation" },
  { label: "Submit Project", icon: Upload, link: "/student/submit-project" },
  { label: "PFE Selection", icon: Star, link: "/student/pfe-selection" },
];

export default function StudentLayout() {
  return (
    <div className="flex h-screen bg-gray-100 flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar menuItems={studentMenuItems} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

