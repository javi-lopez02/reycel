import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";
// import { Spinner } from "@material-tailwind/react";

export const ProtectedRoutes = () => {
  const { loading, isAuth } = useAuth();

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!isAuth && !loading) return <Navigate to="/login" replace />;

  return <Outlet />;
};
