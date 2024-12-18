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

// Import new components
import { ThemeSelection } from './components/ThemeSelection';
import { DefenseAuthorization } from './components/DefenseAuthorization';
import DefenseScheduling from './components/DefenseScheduling';
import { GradeEntry } from './components/GradeEntry';
import { AutomaticAssignment } from './components/AutomaticAssignment';

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
        <Route path="notifications" element={<AdminPages.AdminNotifications />} />
        <Route path="settings" element={<AdminPages.AdminSettings />} />
        <Route path="theme-selection" element={<ThemeSelection userRole="admin" themesToValidate={[]} />} />
        <Route path="automatic-assignment" element={<AutomaticAssignment />} />
        <Route path="defense-scheduling" element={<DefenseScheduling />} />
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
        <Route path="notifications" element={<TeacherPages.TeacherNotifications />} />
        <Route path="settings" element={<TeacherPages.TeacherSettings />} />
        <Route path="theme-selection" element={<ThemeSelection userRole="teacher" themesToValidate={[]} />} />
        <Route path="defense-authorization" element={<DefenseAuthorization />} />
        <Route path="grade-entry" element={<GradeEntry />} />
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
        <Route path="notifications" element={<StudentPages.StudentNotifications />} />
        <Route path="settings" element={<StudentPages.StudentSettings />} />
      </Route>
      
      <Route path="/company" element={
        <PrivateRoute allowedRoles={['company']}>
          <CompanyLayout />
        </PrivateRoute>
      }>
        <Route index element={<CompanyPages.CompanyDashboard />} />
        <Route path="projects" element={<CompanyPages.CompanyProjects />} />
        <Route path="project-proposal" element={<CompanyPages.CompanyProjectProposal />} />
        <Route path="notifications" element={<CompanyPages.CompanyNotifications />} />
        <Route path="settings" element={<CompanyPages.CompanySettings />} />
      </Route>
      
      <Route 
        path="/profile" 
        element={
          <PrivateRoute allowedRoles={['admin', 'teacher', 'student', 'company']}>
            <ProfilePage />
          </PrivateRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

