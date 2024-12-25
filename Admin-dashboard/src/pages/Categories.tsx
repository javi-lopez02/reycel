import { Spinner } from "@nextui-org/react";
import { lazy, Suspense } from "react";

const CategoryTable = lazy(
  () => import("../components/categories/CategoryTable")
);

export default function Categories() {
  return (
    <div className="pt-20 p-16 bg-neutral-100 h-screen">
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="success" />
          </div>
        }
      >
        <CategoryTable />
      </Suspense>
    </div>
  );
}
