//import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/header';
import { Home, Description as FileText, NoteAdd as FileSignature } from '@mui/icons-material';

const companyMenuItems = [
  { label: "Dashboard", icon: Home, link: "/company" },
  { label: "Projects", icon: FileText, link: "/company/projects" },
  { label: "Project Proposal", icon: FileSignature, link: "/company/project-proposal" },
];

export default function CompanyLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar menuItems={companyMenuItems} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

