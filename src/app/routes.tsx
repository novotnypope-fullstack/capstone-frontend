import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { HomePage } from './pages/HomePage';
import { DepartmentDetail } from './pages/DepartmentDetail';
import { FacultyList } from './pages/FacultyList';
import { FacultyDetail } from './pages/FacultyDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import { DepartmentForm } from './pages/DepartmentForm';
import { FacultyForm } from './pages/FacultyForm';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'department/:id', Component: DepartmentDetail },
      { path: 'faculty', Component: FacultyList },
      { path: 'faculty/:id', Component: FacultyDetail },
      { path: 'admin', Component: AdminDashboard },
      { path: 'admin/department/:id', Component: DepartmentForm },
      { path: 'admin/faculty/:id', Component: FacultyForm },
      { path: '*', Component: NotFound },
    ],
  },
]);
