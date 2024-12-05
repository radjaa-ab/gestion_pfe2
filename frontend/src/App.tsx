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
    ],
  },
  {
    path: "/teacher",
    element: <PrivateRoute><TeacherLayout /></PrivateRoute>,
    children: [
      { index: true, element: <TeacherDashboard /> },
    ],
  },
  {
    path: "/student",
    element: <PrivateRoute><StudentLayout /></PrivateRoute>,
    children: [
      { index: true, element: <StudentDashboard /> },
    ],
  },
  {
    path: "/company",
    element: <PrivateRoute><CompanyLayout /></PrivateRoute>,
    children: [
      { index: true, element: <CompanyDashboard /> },
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
        <RouterProvider router={router} />
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;

