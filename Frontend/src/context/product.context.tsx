/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  FC,
  useEffect
} from "react";
import { categoryRequest, searchPproductRequest } from '../services/product'
import { type Products, type ProductContextType, Category, FiltersType, SortOption } from "../types.d";
import axios, { AxiosError } from "axios";
import { useAuth } from "./auth.context";


export const ProductContext = createContext<ProductContextType | null>(
  null
);

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct debe usarse dentro de un ProductProvider");
  }
  return context;
};

export const ProductProvider: FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<Array<Products>>([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Array<string> | null>(null);
  const [errorSerch, setErrorSearch] = useState<Array<string> | null>(null);
  const [isNextPage, setIsNextPage] = useState(true);
  const [querySeach, setQuerySeach] = useState("")
  const [categories, setCategories] = useState<Array<Category>>([])

  const [filters, setFilters] = useState<FiltersType>({})
  const [sortParmas, setSortParmas] = useState<SortOption[] >([])
  const { isAuth } = useAuth()



  const searchProduct = (reset = false) => {
    setError(null);
    setLoading(true)
    searchPproductRequest(querySeach, reset ? 1 : currentPage, filters, sortParmas)
      .then((res) => {
        if (currentPage >= res.data.meta.totalPages) {
          setIsNextPage(false);
        }
        console.log(res.data.meta)
        if (reset) {
          setProducts(res.data.data)
        } else {
          setProducts((prev) => {
            return prev.concat(res.data.data);
          });
        }

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
          setError(["Error con la peticion al servidor"]);
        }
      }).finally(() => {
        setLoading(false)
      });
  };


  useEffect(() => {
    if (!isAuth) {
      return
    }
    categoryRequest()
      .then((res) => {
        setCategories(res.data.data)
      }).catch(() => {
        setError(["Error al cargar las Categorias"])
      })
  }, [isAuth])

  useEffect(() => {
    if (!isAuth) {
      return
    }
    searchProduct(true);
  }, [querySeach, isAuth, filters, sortParmas]);

  useEffect(() => {
    if (!isAuth) {
      return
    }
    if (currentPage > 1) searchProduct(false);
  }, [currentPage, isAuth]);

  return (
    <ProductContext.Provider
      value={{
        products,
        currentPage,
        error,
        loading,
        categories,
        errorSerch,
        isNextPage,
        filters,
        setSortParmas,
        setFilters,
        setQuerySeach,
        setIsNextPage,
        setErrorSearch,
        setCurrentPage
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

