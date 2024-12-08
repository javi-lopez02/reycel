import { Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { Spinner } from '@nextui-org/react'
import Autorizer from "./Autorizer";
export const ProtectedRoutes = () => {
  const { loading, isAuth } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  // if (!isAuth && !loading) return <Navigate to="/login" replace />;

  if (!isAuth && !loading) return <Autorizer/>;

  return <Outlet />;
};
