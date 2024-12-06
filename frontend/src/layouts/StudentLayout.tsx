
import { Layout } from '../components/Layout';
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
  return <Layout menuItems={studentMenuItems} />;
}

