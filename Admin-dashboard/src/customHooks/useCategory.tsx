import { useEffect, useState } from "react";
import { Category } from "../type";
import { categoryRequest } from "../services/category";

function useCategory() {
  const [category, setCategory] = useState<Category[] | null>(null);
  const [error, setError] = useState<Array<string>>();

  useEffect(() => {
    categoryRequest()
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err)
        setError(["Error al cargar las categorias."])
      });
  }, []);

  return {
    category,
    error
  }
}

export default useCategory;
