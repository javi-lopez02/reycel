/* eslint-disable react-hooks/exhaustive-deps */
import Card from "../components/Shop/Card";
import { useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscError } from "react-icons/vsc";
import { useProduct } from "../context/product.context";
import { Spinner } from "@nextui-org/spinner";

export default function Shop() {
  const {
    products,
    isNextPage,
    error,
    currentPage,
    errorSerch,
    querySeach,
    filters,
    sortParmas,
    searchProduct,
    setCurrentPage,
  } = useProduct();

  const ref = useRef();

  useEffect(() => {
    searchProduct(true);
  }, [querySeach, filters, sortParmas]);

  useEffect(() => {
    if (currentPage > 1) searchProduct(false);
  }, [currentPage]);

  return (
    <>
      <div>
        {
          errorSerch && (
            errorSerch.map((err) => {
              return (
                <div key={err} className="w-full flex justify-center pt-4">
                  <span className="text-gray-700 font-bold text-lg">{err}</span>
                </div>
              )
            })
          )
        }
        {
          products.length === 0 && !errorSerch && (
            <div className="w-full flex justify-center pt-4">
              <span className="text-gray-700 font-bold text-lg">No se encontraron Productos</span>
            </div>
          )
        }
        {
          !errorSerch && (
            <InfiniteScroll
              dataLength={products.length}
              next={() => {
                setCurrentPage(currentPage + 1)
              }}
              loader={
                <div className="w-full flex justify-center py-4">
                  <Spinner color="primary" size="lg" />
                </div>
              }
              hasMore={isNextPage}
              scrollableTarget={ref.current}
              endMessage={
                <div className="w-full flex justify-center py-5" >
                  {products.length !== 0 && (
                    <span className="text-lg text-gray-600 font-bold">No hay más Productos para cargar</span>
                  )
                  }
                </div>
              }>
              <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                {
                  products.map((product) => {
                    return (
                      <Card
                        id={product.id}
                        description={product.description}
                        category={product.category}
                        key={product.id}
                        name={product.name}
                        imagen={product.imagen}
                        price={product.price}
                        ram={product.ram}
                        inventoryCount={product.inventoryCount}
                        ratingAverage={product.ratingAverage}
                        storage={product.storage}
                      />
                    )
                  })

                }</div>
            </InfiniteScroll>
          )
        }

        {error && error.map((err) => toast(err))}

        <ToastContainer
          theme="light"
          icon={<VscError color="red" />}
          position="bottom-right"
        />
      </div>
      <div ref={ref.current}></div>
    </>
  );
}
