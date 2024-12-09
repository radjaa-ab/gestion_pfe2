import { Layout } from '../components/Layout';
import { Home, FileText, Calendar } from 'lucide-react';

const menuItems = [
  { label: "Home", icon: Home, link: "/" },
  { label: "Projects", icon: FileText, link: "/projects" },
  { label: "Schedule", icon: Calendar, link: "/schedule" },
];

export default function IndexPage() {
  return (
    <Layout menuItems={menuItems}>
      <h1>Welcome to the PFE Platform</h1>
      {/* Add more content as needed */}
    </Layout>
  );
}

