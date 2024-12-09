import { Layout } from '../components/Layout';
import { Home, FileText, Calendar, MessageSquare, BarChart, PenTool, CheckSquare, Clock, GraduationCap } from 'lucide-react';

const teacherMenuItems = [
  { label: "Dashboard", icon: Home, link: "/teacher" },
  { label: "Projects", icon: FileText, link: "/teacher/projects" },
  { label: "Schedule", icon: Calendar, link: "/teacher/schedule" },
  { label: "Feedback", icon: MessageSquare, link: "/teacher/feedback-submission" },
  { label: "Progress Reports", icon: BarChart, link: "/teacher/progress-report" },
  { label: "Project Proposals", icon: PenTool, link: "/teacher/project-proposal" },
  { label: "Authorization Form", icon: CheckSquare, link: "/teacher/authorization-form" },
  { label: "Wishlist", icon: FileText, link: "/teacher/wishlist" },
  { label: "Availability", icon: Clock, link: "/teacher/availability" },
  { label: "Grading", icon: GraduationCap, link: "/teacher/grading" },
];

export default function TeacherLayout() {
  return <Layout menuItems={teacherMenuItems} />;
}

