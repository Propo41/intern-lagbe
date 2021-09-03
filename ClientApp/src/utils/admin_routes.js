import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../components/admin/layouts/index';
import DashboardApp from '../containers/DashboardApp';
import User from '../containers/User';

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'users', element: <User /> },
        { path: 'companies', element: <User /> },
        { path: 'job-posts', element: <User /> },
        { path: 'applicants', element: <User /> },
        { path: 'reports', element: <User /> }
      ]
    }
  ]);
}
