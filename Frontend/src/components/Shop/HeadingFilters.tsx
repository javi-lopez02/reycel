import { Button } from "@heroui/react";
import ModalFilters from "./ModalFilters";
import { useFilterStore } from "../../store/useFilterStore";

function HeadingFilters() {
  const {
    sortParmas,
    setFilters,
    setSortParmas,
  } = useFilterStore();

  const handleReset = () => {
    setSortParmas([]);
    setFilters({});
  };

  return (
    <>
      <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-4">
        <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Productos
        </h2>
        <div className="flex items-center space-x-4 lg:hidden">
          <ModalFilters />
        </div>
      </div>
      {sortParmas.length !== 0 && (
        <div className="mb-5 w-full flex justify-end">
          <Button onPress={handleReset}>Limpiar Filtros</Button>
        </div>
      )}
    </>
  );
}

export default HeadingFilters;
