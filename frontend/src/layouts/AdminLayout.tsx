import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/header';
import { Home, Users, FileText, Calendar, Settings } from 'lucide-react';

const adminMenuItems = [
  { label: "Dashboard", icon: Home, link: "/" },
  { label: "Users", icon: Users, link: "/admin/users" },
  { label: "Projects", icon: FileText, link: "/admin/projects" },
  { label: "Schedule", icon: Calendar, link: "/admin/schedule" },
  { label: "Settings", icon: Settings, link: "/settings" },
];

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={adminMenuItems} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

