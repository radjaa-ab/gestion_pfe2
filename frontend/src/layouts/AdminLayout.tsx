import { Layout } from '../components/Layout';
import { Home, Users, FileText, Calendar, Settings, Bell, Clock, Shuffle } from 'lucide-react';

const adminMenuItems = [
  { label: "Dashboard", icon: Home, link: "/admin" },
  { label: "Users", icon: Users, link: "/admin/users" },
  { label: "Projects", icon: FileText, link: "/admin/projects" },
  { label: "Schedule", icon: Calendar, link: "/admin/schedule" },
  { label: "Theme Selection", icon: FileText, link: "/admin/theme-selection" },
  { label: "Automatic Assignment", icon: Shuffle, link: "/admin/automatic-assignment" },
  { label: "Defense Scheduling", icon: Clock, link: "/admin/defense-scheduling" },
  { label: "Notifications", icon: Bell, link: "/admin/notifications" },
  { label: "Settings", icon: Settings, link: "/admin/settings" },
];

export default function AdminLayout() {
  return <Layout menuItems={adminMenuItems} />;
}

