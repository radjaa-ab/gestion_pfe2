import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';
import StudentLayout from './layouts/StudentLayout';
import CompanyLayout from './layouts/CompanyLayout';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';

// Import your dashboard components
import * as AdminPages from './pages/admin';
import * as TeacherPages from './pages/teacher';
import * as StudentPages from './pages/student';
import * as CompanyPages from './pages/company';

import Notifications from './pages/Notifications';
import Settings from './pages/settings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/admin" element={
        <PrivateRoute allowedRoles={['admin']}>
          <AdminLayout />
        </PrivateRoute>
      }>
        <Route index element={<AdminPages.AdminDashboard />} />
        <Route path="users" element={<AdminPages.AdminUsers />} />
        <Route path="projects" element={<AdminPages.AdminProjects />} />
        <Route path="schedule" element={<AdminPages.AdminSchedule />} />
        <Route path="settings" element={<AdminPages.AdminSettings />} />
      </Route>
      
      <Route path="/teacher" element={
        <PrivateRoute allowedRoles={['teacher']}>
          <TeacherLayout />
        </PrivateRoute>
      }>
        <Route index element={<TeacherPages.TeacherDashboard />} />
        <Route path="projects" element={<TeacherPages.TeacherProjects />} />
        <Route path="schedule" element={<TeacherPages.TeacherSchedule />} />
        <Route path="feedback-submission" element={<TeacherPages.TeacherFeedback />} />
        <Route path="progress-report" element={<TeacherPages.TeacherProgressReports />} />
        <Route path="project-proposal" element={<TeacherPages.TeacherProjectProposals />} />
      </Route>
      
      <Route path="/student" element={
        <PrivateRoute allowedRoles={['student']}>
          <StudentLayout />
        </PrivateRoute>
      }>
        <Route index element={<StudentPages.StudentDashboard />} />
        <Route path="projects" element={<StudentPages.StudentProjects />} />
        <Route path="schedule" element={<StudentPages.StudentSchedule />} />
        <Route path="progress-report" element={<StudentPages.StudentProgressReport />} />
        <Route path="project-proposal" element={<StudentPages.StudentProjectProposal />} />
        <Route path="team-formation" element={<StudentPages.StudentTeamFormation />} />
        <Route path="submit-project" element={<StudentPages.StudentSubmitProject />} />
        <Route path="pfe-selection" element={<StudentPages.StudentPFESelection />} />
      </Route>
      
      <Route path="/company" element={
        <PrivateRoute allowedRoles={['company']}>
          <CompanyLayout />
        </PrivateRoute>
      }>
        <Route index element={<CompanyPages.CompanyDashboard />} />
        <Route path="projects" element={<CompanyPages.CompanyProjects />} />
        <Route path="project-proposal" element={<CompanyPages.CompanyProjectProposal />} />
      </Route>
      
      <Route 
        path="/profile" 
        element={
          <PrivateRoute allowedRoles={['admin', 'teacher', 'student', 'company']}>
            <ProfilePage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/notifications" 
        element={
          <PrivateRoute allowedRoles={['admin', 'teacher', 'student', 'company']}>
            <Notifications />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <PrivateRoute allowedRoles={['admin', 'teacher', 'student', 'company']}>
            <Settings />
          </PrivateRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

