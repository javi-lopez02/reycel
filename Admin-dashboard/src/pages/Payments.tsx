import { Spinner } from "@heroui/react";
import { lazy, Suspense } from "react";

const PaymentsMethodTable = lazy(
  () => import("../components/pagos/PaymentsMethodTable")
);

const PaymentsTable = lazy(() => import("../components/pagos/PaymentsTable"));

export default function Payments() {
  return (
    <div className="pt-20 p-2 lg:p-16 flex flex-col gap-y-7 bg-neutral-100 h-full">
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="success" />
          </div>
        }
      >
        <PaymentsTable />
        <PaymentsMethodTable />
      </Suspense>
    </div>
  );
}
