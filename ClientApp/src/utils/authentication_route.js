import { useRoutes, Navigate } from "react-router-dom";
import Login from "../containers/Login";

export default function Router() {
  return useRoutes([
    { path: "/", element: <Login /> },
    { path: "*", element: <Navigate to="/" /> },
  ]);
}
