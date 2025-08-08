import { lazy, Suspense } from "react";
import { Spinner } from "@heroui/react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const TableSedes  =lazy(()=>import("../components/sedes/TableSedes"))


export default function Sedes() {
  const { user, loading } = useAuth();

  if (user?.role !== "OWNER" && !loading) return <Navigate to="/products" replace />;
  return (
    <div className="pt-14 p-2 lg:p-6 lg:pt-16 bg-neutral-100 h-screen">
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="success" />
          </div>
        }
      >
      <TableSedes />

      </Suspense>
    </div>
  );
}
