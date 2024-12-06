import { Layout } from '../components/Layout';
import { Home, FileText, Calendar, MessageSquare, ClipboardList, FileSignature, CheckCircle, Edit } from 'lucide-react';

const teacherMenuItems = [
  { label: "Dashboard", icon: Home, link: "/teacher" },
  { label: "Projects", icon: FileText, link: "/teacher/projects" },
  { label: "Schedule", icon: Calendar, link: "/teacher/schedule" },
  { label: "Feedback", icon: MessageSquare, link: "/teacher/feedback-submission" },
  { label: "Progress Reports", icon: ClipboardList, link: "/teacher/progress-report" },
  { label: "Project Proposals", icon: FileSignature, link: "/teacher/project-proposal" },
  { label: "Theme Selection", icon: FileText, link: "/teacher/theme-selection" },
  { label: "Defense Authorization", icon: CheckCircle, link: "/teacher/defense-authorization" },
  { label: "Grade Entry", icon: Edit, link: "/teacher/grade-entry" },
];

export default function TeacherLayout() {
  return <Layout menuItems={teacherMenuItems} />;
}

