import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider } from './components/SidebarProvider';
import PrivateRoute from './components/PrivateRoute';
import LoadingPage from './components/LoadingPage';

// Lazy load components
const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));
const TeacherLayout = React.lazy(() => import('./layouts/TeacherLayout'));
const StudentLayout = React.lazy(() => import('./layouts/StudentLayout'));
const CompanyLayout = React.lazy(() => import('./layouts/CompanyLayout'));
const AdminDashboard = React.lazy(() => import('./pages/admin/admin_dashboard'));
const TeacherDashboard = React.lazy(() => import('./pages/teacher/teacher-dashboard'));
const StudentDashboard = React.lazy(() => import('./pages/student/student-dashboard'));
const CompanyDashboard = React.lazy(() => import('./pages/company/company-dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/register'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Suspense fallback={<LoadingPage />}><Login /></Suspense>,
  },
  {
    path: "/register",
    element: <Suspense fallback={<LoadingPage />}><Register /></Suspense>,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Suspense fallback={<LoadingPage />}><Dashboard /></Suspense></PrivateRoute>,
  },
  {
    path: "/admin",
    element: <PrivateRoute><Suspense fallback={<LoadingPage />}><AdminLayout /></Suspense></PrivateRoute>,
    children: [
      { index: true, element: <AdminDashboard /> },
    ],
  },
  {
    path: "/teacher",
    element: <PrivateRoute><Suspense fallback={<LoadingPage />}><TeacherLayout /></Suspense></PrivateRoute>,
    children: [
      { index: true, element: <TeacherDashboard /> },
    ],
  },
  {
    path: "/student",
    element: <PrivateRoute><Suspense fallback={<LoadingPage />}><StudentLayout /></Suspense></PrivateRoute>,
    children: [
      { index: true, element: <StudentDashboard /> },
    ],
  },
  {
    path: "/company",
    element: <PrivateRoute><Suspense fallback={<LoadingPage />}><CompanyLayout /></Suspense></PrivateRoute>,
    children: [
      { index: true, element: <CompanyDashboard /> },
    ],
  },
  {
    path: "*",
    element: <Suspense fallback={<LoadingPage />}><NotFound /></Suspense>,
  },
]);

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;

