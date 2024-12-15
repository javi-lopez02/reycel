import { useEffect, useState } from "react";
import { productRequest } from "../services/product";
import { Category, Products } from "../type";
import { categoryRequest } from "../services/category";

function useProduct() {
  const [products, setProducts] = useState<Products[] | null>(null);
  const [category, setCategory] = useState<Category[] | null>(null);
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    productRequest()
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Ocuurio un error con la peticion."]);
      })
      .finally(() => {
        setLoading(false);
      });
    categoryRequest()
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Ocuurio un error con la peticion."]);
      });
  }, []);

  return { products, category, error, loading };
}

export default useProduct;