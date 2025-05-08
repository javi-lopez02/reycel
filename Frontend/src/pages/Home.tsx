import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import HeadingFilters from "../components/Shop/HeadingFilters";
import Shop from "./Shop";
import { Category } from "../types";
import { categoryRequest } from "../services/product";
import { toast } from "sonner";

function Home() {
  const [categories, setCategories] = useState<Array<Category>>([]);
  useEffect(() => {
    categoryRequest()
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error al cargar las Categorias");
      });
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen py-8 antialiased dark:bg-gray-900 md:py-9 grid grid-flow-col">
      <Filters categories={categories}/>
      <div className="max-w-screen 2xl:px-0 mx-5 lg:ml-72 lg:pt-2 pt-5">
        {/* <!-- Heading & Filters --> */}
        <HeadingFilters categories={categories}/>

        <Shop />
      </div>
    </section>
  );
}

export default Home;
