import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider } from './components/SidebarProvider';
import PrivateRoute from './components/PrivateRoute';
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
import ResourceRequest from './pages/resource-request';
import DefenseManagement from './pages/DefenseManagement';
import DefenseSchedule from './pages/DefenseSchedule';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
  },
  {
    path: "/admin",
    element: <PrivateRoute><AdminLayout /></PrivateRoute>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <Users /> },
      { path: "projects", element: <Projects /> },
      { path: "schedule", element: <Schedule /> },
      { path: "settings", element: <Settings /> },
      { path: "defense-management", element: <DefenseManagement /> },
      { path: "defense-schedule", element: <DefenseSchedule /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },
  {
    path: "/teacher",
    element: <PrivateRoute><TeacherLayout /></PrivateRoute>,
    children: [
      { index: true, element: <TeacherDashboard /> },
      { path: "projects", element: <Projects /> },
      { path: "schedule", element: <Schedule /> },
      { path: "feedback-submission", element: <FeedbackSubmission /> },
      { path: "progress-report", element: <ProgressReport /> },
      { path: "project-proposal", element: <ProjectProposal /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },
  {
    path: "/student",
    element: <PrivateRoute><StudentLayout /></PrivateRoute>,
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: "pfe-selection", element: <PfeSelection /> },
      { path: "submit-project", element: <SubmitProject /> },
      { path: "team-formation", element: <TeamFormation /> },
      { path: "progress-report", element: <ProgressReport /> },
      { path: "resource-request", element: <ResourceRequest /> },
      { path: "notifications", element: <Notifications /> },
      { path: "feedback-submission", element: <FeedbackSubmission /> },
    ],
  },
  {
    path: "/company",
    element: <PrivateRoute><CompanyLayout /></PrivateRoute>,
    children: [
      { index: true, element: <CompanyDashboard /> },
      { path: "project-proposal", element: <ProjectProposal /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <RouterProvider 
          router={router} 
          />
      </SidebarProvider>
    </AuthProvider>
  );
}

// TODO: Update @types/react-router-dom when a new version is available that includes the 'future' prop type

export default App;

