import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  FC,
  useCallback
} from "react";
import { searchPproductRequest } from '../services/product'
import { type Products, type ProductContextType } from "../types.d";
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Array<string> | null>(null);
  const [errorSerch, setErrorSearch] = useState<Array<string> | null>(null);
  const [isNextPage, setIsNextPage] = useState(true);

  const searchProduct = useCallback((query?: string) => {
    setError(null);
    setLoading(true)
    if (query === undefined) {
      query = ""
    }
    searchPproductRequest(query, currentPage)
      .then((res) => {
        if (currentPage >= res.data.meta.totalPages) {
          setIsNextPage(false);
        }
        console.log(res.data.data)
        if (currentPage === 1) {
          return setProducts(res.data.data)
        }
        setProducts((prev) => {
          return prev.concat(res.data.data);
        });
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
  }, [currentPage]);

  return (
    <ProductContext.Provider
      value={{
        products,
        currentPage,
        error,
        loading,
        errorSerch,
        isNextPage,
        searchProduct,
        setIsNextPage,
        setErrorSearch,
        setCurrentPage
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// AuthProvider.propTypes = {
//   children: PropTypes.node,
// };
