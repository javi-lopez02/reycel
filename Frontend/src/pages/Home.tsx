import { useEffect, useState } from "react";
import Filters from "../components/Shop/Filters";
import Shop from "./Shop";
import { Category } from "../types";
import { categoryRequest } from "../services/product";
import { toast } from "sonner";

function Home() {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    categoryRequest()
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch(() => {
        toast.error("Error al cargar las Categorias");
      });
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen py-8 antialiased dark:bg-gray-900 md:py-9 grid grid-flow-col">
      <Filters
        categories={categories}
        isOpen={sidebarOpen}
        toggle={toggleSidebar}
      />
      <div className="max-w-screen 2xl:px-0 mx-5 lg:ml-72 lg:pt-2 pt-5">
        {/* <!-- Heading & Filters --> */}
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-4">
          <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Productos
          </h2>
          <div className="flex items-center space-x-4 lg:hidden">
            <button
              onClick={toggleSidebar}
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
            >
              <svg
                className="-ms-0.5 me-2 h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
                />
              </svg>
              Filtros
              <svg
                className="-me-0.5 ms-2 h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
        <Shop />
      </div>
    </section>
  );
}

export default Home;
