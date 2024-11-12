import { useState, useCallback } from "react";
import { Products } from "../types";
import { productRequest } from "../services/product";
import axios, { AxiosError } from "axios";

export function useProduct() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Array<Products>>([]);
  const [error, setError] = useState<Array<string> | null>(null);
  const [isNextPage, setIsNextPage] = useState(true);

  const getProduct = (page: number) => {
    setError(null);
    setLoading(true);
    productRequest(page)
      .then((res) => {
        console.log(res.data.data);
        /* setProducts((prevProduct) =>  {
          return [...prevProduct, res.data.data]
        });   */
        setProducts(res.data.data);
        console.log(res.data.meta.topalPages);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;

          if (axiosError.response) {
            setError(axiosError.response.data as Array<string>);
          } else if (axiosError.request) {
            console.error("No se recibió respuesta:", axiosError.request);
          }
        } else {
          console.error("Error desconocido:", error);
          setError(["Error desconocido"]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, products, error, getProduct };
}
