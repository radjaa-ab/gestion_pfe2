
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar';
import { Header } from '../components/header';
import { Home, Users, FileText, Calendar, Settings } from 'lucide-react';

const adminMenuItems = [
  { label: "Dashboard", icon: Home, link: "/admin" },
  { label: "Users", icon: Users, link: "/admin/users" },
  { label: "Projects", icon: FileText, link: "/admin/projects" },
  { label: "Schedule", icon: Calendar, link: "/admin/schedule" },
  { label: "Settings", icon: Settings, link: "/admin/settings" },
];

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100 flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar menuItems={adminMenuItems} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

