import { Spinner } from "@nextui-org/react";
import { lazy, Suspense } from "react";

const PaymentsMethodTable = lazy(
  () => import("../components/pagos/PaymentsMethodTable")
);

const PaymentsTable = lazy(() => import("../components/pagos/PaymentsTable"));

export default function Payments() {
  return (
    <div className="pt-20 p-16 flex flex-col gap-y-20 bg-neutral-100 h-full">
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
