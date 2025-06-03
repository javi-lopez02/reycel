import { Spinner } from "@heroui/react";
import { lazy, Suspense } from "react";

const WorkersTable = lazy(() => import("../components/workers/WorkersTable"));

export default function Workers() {
  return (
    <div className="pt-20 p-16 bg-neutral-100 h-screen">
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="primary" />
          </div>
        }
      >
        <WorkersTable />
      </Suspense>
    </div>
  );
}