import { Spinner } from "@heroui/react";
import { lazy, Suspense } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const InvestmentsTable = lazy(() => import("../components/investments/InvestmentsTable"));

export default function Investments() {
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
        <InvestmentsTable />
      </Suspense>
    </div>
  );
}