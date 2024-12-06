
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider } from './components/SidebarProvider';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/register';
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';
import StudentLayout from './layouts/StudentLayout';
import CompanyLayout from './layouts/CompanyLayout';
import NotFound from './pages/NotFound';

// Import your dashboard components
import AdminDashboard from './pages/admin/admin_dashboard'
import AdminUsers from './pages/users';
import AdminProjects from './pages/admin/AdminProjects';
import AdminSchedule from './pages/admin/AdminSchedule';
import AdminSettings from './pages/admin/AdminSettings';

import TeacherDashboard from './pages/teacher/teacher-dashboard';
import TeacherProjects from './pages/teacher/TeacherProjects';
import TeacherSchedule from './pages/teacher/TeacherSchedule';
import TeacherFeedback from './pages/teacher/TeacherFeedback';
import TeacherProgressReports from './pages/teacher/TeacherProgressReports';
import TeacherProjectProposals from './pages/teacher/TeacherProjectProposals';

import StudentDashboard from './pages/student/student-dashboard';
import StudentProjects from './pages/student/StudentProjects';
import StudentSchedule from './pages/student/StudentSchedule';
import StudentProgressReport from './pages/student/StudentProgressReport';
import StudentProjectProposal from './pages/student/StudentProjectProposal';
import StudentTeamFormation from './pages/student/StudentTeamFormation';
import StudentSubmitProject from './pages/student/StudentSubmitProject';
import StudentPFESelection from './pages/student/StudentPFESelection';

import CompanyDashboard from './pages/company/company-dashboard';
import CompanyProjects from './pages/company/CompanyProjects';
import CompanyProjectProposal from './pages/company/CompanyProjectProposal';

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']}><AdminLayout /></PrivateRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="schedule" element={<AdminSchedule />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            <Route path="/teacher" element={<PrivateRoute allowedRoles={['teacher']}><TeacherLayout /></PrivateRoute>}>
              <Route index element={<TeacherDashboard />} />
              <Route path="projects" element={<TeacherProjects />} />
              <Route path="schedule" element={<TeacherSchedule />} />
              <Route path="feedback-submission" element={<TeacherFeedback />} />
              <Route path="progress-report" element={<TeacherProgressReports />} />
              <Route path="project-proposal" element={<TeacherProjectProposals />} />
            </Route>
            
            <Route path="/student" element={<PrivateRoute allowedRoles={['student']}><StudentLayout /></PrivateRoute>}>
              <Route index element={<StudentDashboard />} />
              <Route path="projects" element={<StudentProjects />} />
              <Route path="schedule" element={<StudentSchedule />} />
              <Route path="progress-report" element={<StudentProgressReport />} />
              <Route path="project-proposal" element={<StudentProjectProposal />} />
              <Route path="team-formation" element={<StudentTeamFormation />} />
              <Route path="submit-project" element={<StudentSubmitProject />} />
              <Route path="pfe-selection" element={<StudentPFESelection />} />
            </Route>
            
            <Route path="/company" element={<PrivateRoute allowedRoles={['company']}><CompanyLayout /></PrivateRoute>}>
              <Route index element={<CompanyDashboard />} />
              <Route path="projects" element={<CompanyProjects />} />
              <Route path="project-proposal" element={<CompanyProjectProposal />} />
            </Route>
            
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;

