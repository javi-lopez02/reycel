import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "@heroui/react";

function ProtectedRoutes() {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return (
      <h1 className="w-full h-full flex items-center justify-center">
        <Spinner />
      </h1>
    );
  }

  if (!isAuth && !loading) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoutes;
