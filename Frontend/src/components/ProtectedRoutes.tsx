import { Outlet } from "react-router-dom";
import Autorizer from "./Autorizer";
import { useUserStore } from "../store/useUserStore";
//import { Spinner } from '@heroui/react'
export const ProtectedRoutes = () => {
  const { loading, isAuth } = useUserStore();

/*   if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  } */

  // if (!isAuth && !loading) return <Navigate to="/login" replace />;

  if (!isAuth && !loading) return <Autorizer/>;

  return <Outlet />;
};
