import { Spinner } from "@heroui/react";
import { lazy, Suspense } from "react";

const InvestmentsTable = lazy(() => import("../components/investments/InvestmentsTable"));

export default function Investments() {
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