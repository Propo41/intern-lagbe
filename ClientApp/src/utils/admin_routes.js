import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../components/layouts/index";
import DashboardApp from "../containers/DashboardApp";
import User from "../containers/User";
import Applicant from "../containers/Applicant";
import Report from "../containers/Report";
import Company from "../containers/Company";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" replace /> },
        { path: "/dashboard", element: <DashboardApp /> },
        { path: "users", element: <User /> },
        { path: "companies", element: <Company /> },
        { path: "job-posts", element: <User /> },
        { path: "applicants", element: <Applicant /> },
        { path: "reports", element: <Report /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/dashboard" replace />,
    },
  ]);
}
