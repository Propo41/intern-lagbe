import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './components/admin/layouts/index';
import DashboardApp from './containers/DashboardApp';
import LandingPage from './containers/LandingPage';
import User from './containers/User';

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <LandingPage />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <LandingPage /> },
      
      ]
    }
  ]);
}
