import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar';
import { Header } from '../components/header';
import { Home, Users, FileText, Calendar, Settings, Bell } from 'lucide-react';

const adminMenuItems = [
  { label: "Dashboard", icon: Home, link: "/admin" },
  { label: "Users", icon: Users, link: "/admin/users" },
  { label: "Projects", icon: FileText, link: "/admin/projects" },
  { label: "Schedule", icon: Calendar, link: "/admin/schedule" },
  { label: "Notifications", icon: Bell, link: "/admin/notifications" },
  { label: "Settings", icon: Settings, link: "/admin/settings" },
];

export default function AdminLayout() {

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={adminMenuItems} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

