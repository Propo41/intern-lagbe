import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../components/layouts/index";
import DashboardApp from "../containers/DashboardApp";
import User from "../containers/User";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" replace /> },
        { path: "/dashboard", element: <DashboardApp /> },
        { path: "users", element: <User /> },
        { path: "companies", element: <User /> },
        { path: "job-posts", element: <User /> },
        { path: "applicants", element: <User /> },
        { path: "reports", element: <User /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/dashboard" replace />,
    },
  ]);
}
