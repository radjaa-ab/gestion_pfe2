
import { Layout } from '../components/Layout';
import { Home, FileText, FileSignature } from 'lucide-react';

const companyMenuItems = [
  { label: "Dashboard", icon: Home, link: "/company" },
  { label: "Projects", icon: FileText, link: "/company/projects" },
  { label: "Project Proposal", icon: FileSignature, link: "/company/project-proposal" },
];

export default function CompanyLayout() {
  return <Layout menuItems={companyMenuItems} />;
}

