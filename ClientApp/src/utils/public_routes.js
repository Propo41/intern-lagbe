import { useRoutes } from "react-router-dom";
import LandingPage from "../containers/LandingPage";
import AboutPage from "../containers/AboutPage";
import CompanyPage from "../containers/CompanyPage";
import SignInPage from "../containers/SignInPage";
import RegisterPage from "../containers/RegisterPage";
import ForgotPassword from "../containers/ForgotPassword";
import ChangePassword from "../containers/ChangePassword";
import StatusPage from "../containers/StatusPage";
import NotFoundPage from "../containers/NotFoundPage";

export default function Router() {
  return useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/company/:companyId", element: <CompanyPage /> },
    { path: "/sign-in", element: <SignInPage /> },
    { path: "/register", element: <RegisterPage /> },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/auth/user/change-password",
      element: <ChangePassword />,
    },
    {
      path: "/auth/user/verify",
      element: <StatusPage />,
    },

    { path: "/*", element: <NotFoundPage /> },
  ]);
}
