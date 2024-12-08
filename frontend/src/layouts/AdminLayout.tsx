import { Layout } from '../components/Layout';
import { Home, Users, FileText, Calendar, Settings, Bell, UserCheck, ClipboardList } from 'lucide-react';

const adminMenuItems = [
  { label: "Dashboard", icon: Home, link: "/admin" },
  { label: "Users", icon: Users, link: "/admin/users" },
  { label: "Projects", icon: FileText, link: "/admin/projects" },
  { label: "Schedule", icon: Calendar, link: "/admin/schedule" },
  { label: "Notifications", icon: Bell, link: "/admin/notifications" },
  { label: "Jury Management", icon: UserCheck, link: "/admin/jury-management" },
  { label: "Soutenance Planning", icon: ClipboardList, link: "/admin/soutenance-planning" },
  { label: "Settings", icon: Settings, link: "/admin/settings" },

];

export default function AdminLayout() {
  return <Layout menuItems={adminMenuItems} />;
}

