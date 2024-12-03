import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';
import StudentLayout from './layouts/StudentLayout';
import CompanyLayout from './layouts/CompanyLayout';
import AdminDashboard from './pages/admin/admin_dashboard';
import TeacherDashboard from './pages/teacher/teacher-dashboard';
import StudentDashboard from './pages/student/student-dashboard';
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
// Remove this line
//import Register from './pages/Register';
import ResourceRequest from './pages/resource-request';
import DefenseManagement from './pages/DefenseManagement';
import DefenseSchedule from './pages/DefenseSchedule';
import Notifications from './pages/Notifications';
import RoleSelection from './pages/RoleSelection';

function App() {
  return (
    <Router>
      <Routes>
        {/* Role Selection Page */}
        <Route path="/" element={<RoleSelection />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="projects" element={<Projects />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="settings" element={<Settings />} />
          <Route path="defense-management" element={<DefenseManagement />} />
          <Route path="defense-schedule" element={<DefenseSchedule />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="project-proposal" element={<ProjectProposal />} />
          <Route path="progress-report" element={<ProgressReport />} />
          <Route path="defense-schedule" element={<DefenseSchedule />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="pfe-selection" element={<PfeSelection />} />
          <Route path="submit-project" element={<SubmitProject />} />
          <Route path="team-formation" element={<TeamFormation />} />
          <Route path="progress-report" element={<ProgressReport />} />
          <Route path="resource-request" element={<ResourceRequest />} />
        </Route>

        {/* Company Routes */}
        <Route path="/company" element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />
          <Route path="project-proposal" element={<ProjectProposal />} />
        </Route>

        {/* Shared Routes */}
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/feedback-submission" element={<FeedbackSubmission />} />
      </Routes>
    </Router>
  );
}

export default App;

