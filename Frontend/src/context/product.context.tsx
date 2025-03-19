import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  FC,
  useCallback,
} from "react";
import { searchPproductRequest } from '../services/product'
import { type Products, type ProductContextType, FiltersType, SortOption } from "../types.d";
import axios, { AxiosError } from "axios";


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
  const [error, setError] = useState<Array<string> | null>(null);
  const [isNextPage, setIsNextPage] = useState(true);
  
  const [errorSerch, setErrorSearch] = useState<Array<string> | null>(null);
  const [querySeach, setQuerySeach] = useState("")
  const [filters, setFilters] = useState<FiltersType>({})
  const [sortParmas, setSortParmas] = useState<SortOption[]>([])

  const searchProduct = useCallback((reset = false) => {
    setError(null);
    searchPproductRequest(querySeach, reset ? 1 : currentPage, filters, sortParmas)
      .then((res) => {
        if (currentPage >= res.data.meta.totalPages) {
          setIsNextPage(false);
        }
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
      })
  }, [currentPage, filters, querySeach, sortParmas])

  return (
    <ProductContext.Provider
      value={{
        products,
        currentPage,
        error,
        errorSerch,
        isNextPage,
        filters,
        sortParmas,
        querySeach,
        searchProduct,
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

