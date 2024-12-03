import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/header';
import { 
  Home, 
  Description as FileText, 
  Event as Calendar, 
  Assignment as ClipboardList, 
  NoteAdd as FileSignature, 
  Group as Users, 
  CloudUpload as Upload, 
  Star 
} from '@mui/icons-material';

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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar menuItems={studentMenuItems} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

