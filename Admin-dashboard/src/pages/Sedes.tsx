import { lazy, Suspense } from "react";
import { Spinner } from "@heroui/react";


const TableSedes  =lazy(()=>import("../components/sedes/TableSedes"))

export default function Sedes() {
  return (
    <div className="pt-20 p-2 lg:p-16">
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
