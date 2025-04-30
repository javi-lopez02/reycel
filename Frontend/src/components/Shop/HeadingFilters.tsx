import { useFilterStore } from "../../store/useFilterStore";
import { Category } from "../../types";
import { FC } from "react";
import FiltersDrawer from "./FiltersDrawer";
import { BiReset } from "react-icons/bi";

interface FiltersProps {
  categories: Category[];
}

const HeadingFilters: FC<FiltersProps> = ({ categories }) => {
  const { sortParmas, setFilters, setSortParmas } = useFilterStore();

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
        <div className="flex justify-between items-center space-x-4 lg:hidden">
          <FiltersDrawer categories={categories}></FiltersDrawer>
          {sortParmas.length !== 0 && (
            <div className="flex justify-end">
              <button
                className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
                onClick={handleReset}
              >
                Reset
                <BiReset className="w-5"/>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HeadingFilters;
