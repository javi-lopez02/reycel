import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import SideBar from "../components/Sidebar/SideBar";
import { Products } from "../types";
import { productRequest } from "../services/product";
import axios, { AxiosError } from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Shop() {
  const [products, setProducts] = useState<Array<Products>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<Array<string> | null>(null);
  const [isNextPage, setIsNextPage] = useState(true);

  const ref = useRef();

  useEffect(() => {
    setError(null);
    productRequest(currentPage)
      .then((res) => {
        console.log(res.data.data);
        if (currentPage >= res.data.meta.totalPages) {
          setIsNextPage(false);
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
          setError(["Error desconocido"]);
        }
      });
  }, [currentPage]);

  return (
    <>
      <div className="w-2/12 h-full hidden xl:flex flex-col top-0 left-0">
        <div className="fixed">
          <SideBar />
        </div>
      </div>
      <InfiniteScroll
        dataLength={products.length}
        next={() => setCurrentPage(currentPage + 1)}
        loader={<h1>Loading...</h1>}
        hasMore={isNextPage}
        scrollableTarget={ref.current}
        endMessage={
          <p>
            <b>No hay mas elementos q cargar</b>
          </p>
        }
      >
        <div className="w-full listProduct pt-2 px-2">
          {products.map((protuct) => {
            return (
              <Card
                key={protuct.id}
                image={protuct.imagen}
                title={protuct.name}
                price={protuct.price}
                description={protuct.description}
              />
            );
          })}
        </div>
      </InfiniteScroll>
      <div ref={ref.current}></div>
    </>
  );
}
