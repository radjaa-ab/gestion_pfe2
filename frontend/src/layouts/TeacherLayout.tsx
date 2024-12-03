import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/header';
import { 
  Home, 
  Description as FileText, 
  Event as Calendar, 
  Message as MessageSquare, 
  Assignment as ClipboardList, 
  NoteAdd as FileSignature 
} from '@mui/icons-material';

const teacherMenuItems = [
  { label: "Dashboard", icon: Home, link: "/teacher" },
  { label: "Projects", icon: FileText, link: "/teacher/projects" },
  { label: "Schedule", icon: Calendar, link: "/teacher/schedule" },
  { label: "Feedback", icon: MessageSquare, link: "/teacher/feedback-submission" },
  { label: "Progress Reports", icon: ClipboardList, link: "/teacher/progress-report" },
  { label: "Project Proposals", icon: FileSignature, link: "/teacher/project-proposal" },
];

export default function TeacherLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar menuItems={teacherMenuItems} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

