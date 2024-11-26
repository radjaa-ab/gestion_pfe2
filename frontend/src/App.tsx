import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';
import StudentLayout from './layouts/StudentLayout';
import CompanyLayout from './layouts/CompanyLayout';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/admin_dashboard';
import TeacherDashboard from './pages/teacher/teacher-dashboard';
import StudentDashboard from './pages/student/student-dashboard';
import Dashboard from './pages';
import CompanyDashboard from './pages/company/company-dashboard';
import Users from './pages/users';
import Projects from './pages/projects';
import Schedule from './pages/schedule';
import Settings from './pages/settings';
import FeedbackSubmission from './pages/feedback-submission';
import ProgressReport from './pages/progress-report';
import ProjectProposal from './pages/project-proposal';
import SubmitProject from './pages/submit-project';
import TeamFormation from './pages/team-formation';
import PfeSelection from './pages/PfeSelection';
import Register from './pages/Register';
import ResourceRequest from './pages/resource-request';

function AppRoutes() {
  const { user } = useAuth();



  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {user.role === 'admin' && (
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/settings" element={<Settings />} />
          
        </Route>
      )}
      {user.role === 'teacher' && (
        <Route element={<TeacherLayout />}>
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/schedule" element={<Schedule />} />
        
        </Route>
      )}
      {user.role === 'student' && (
        <Route element={<StudentLayout />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/pfe-selection" element={<PfeSelection />} />
          <Route path="/submit-project" element={<SubmitProject />} />
      
        </Route>
      )}
      {user.role === 'company' && (
        <Route element={<CompanyLayout />}>
          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project-proposal" element={<ProjectProposal />} />
        </Route>
      )}
      <Route path="*" element={<Navigate to={`/${user.role}`} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;

