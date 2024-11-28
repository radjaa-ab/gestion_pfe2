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
import DefenseManagement from './pages/DefenseManagement';
import DefenseSchedule from './pages/DefenseSchedule';


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user} = useAuth();

 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={<ProtectedRoute>{user ? <Navigate to={`/${user.role}`} replace /> : null}</ProtectedRoute>} />

      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="projects" element={<Projects />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="settings" element={<Settings />} />
        <Route path="defense-management" element={<DefenseManagement />} />
      </Route>

      <Route path="/teacher" element={<ProtectedRoute><TeacherLayout /></ProtectedRoute>}>
        <Route index element={<TeacherDashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="defense-schedule" element={<DefenseSchedule />} />
      </Route>

      <Route path="/student" element={<ProtectedRoute><StudentLayout /></ProtectedRoute>}>
        <Route index element={<StudentDashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="pfe-selection" element={<PfeSelection />} />
        <Route path="submit-project" element={<SubmitProject />} />
        <Route path="defense-schedule" element={<DefenseSchedule />} />
      </Route>

      <Route path="/company" element={<ProtectedRoute><CompanyLayout /></ProtectedRoute>}>
        <Route index element={<CompanyDashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="project-proposal" element={<ProjectProposal />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
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

