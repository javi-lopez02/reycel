/* eslint-disable react-hooks/exhaustive-deps */
import Card from "../components/Shop/Card";
import { useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {toast} from 'sonner'
import { useProduct } from "../context/product.context";
import { Spinner } from "@heroui/spinner";

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
                  <Spinner />
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
              <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
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
                        rating={product.rating}
                        storage={product.storage}
                      />
                    )
                  })

                }</div>
            </InfiniteScroll>
          )
        }

        {error && error.map((err) => toast.error(err))}

      
      </div>
      <div ref={ref.current}></div>
    </>
  );
}
