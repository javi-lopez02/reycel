import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import Loader from "./Loader";
// import { Spinner } from "@material-tailwind/react";

export const ProtectedRoutes = () => {
  const { loading, isAuth } = useAuth();

  if (loading) {
    return (
      <div className="grid w-full h-full content-center">
        <Loader />
      </div>
    );
  }

  if (!isAuth && !loading) return <Navigate to="/login" replace />;

  return <Outlet />;
};
