import Card from "../components/Shop/Card";
import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";
import { Spinner } from "@heroui/spinner";
import { useProduct } from "../customHooks/useProduct";
import { useFilterStore } from "../store/useFilterStore";

export default function Shop() {
  const { querySeach, filters, sortParmas } = useFilterStore();
  const { products, hasNextPage, isError, fetchNextPage, isLoading } =
    useProduct(querySeach, filters, sortParmas);

  const ref = useRef();

  return (
    <>
      <div>
        {products.length === 0 && !isLoading && (
          <div className="w-full flex justify-center pt-4">
            <span className="text-gray-700 font-bold text-lg">
              No se encontraron Productos
            </span>
          </div>
        )}

        {isLoading && (
          <div className="w-full flex justify-center py-4">
            <Spinner />
          </div>
        )}

        <InfiniteScroll
          dataLength={products.length}
          next={fetchNextPage}
          loader={
            <div className="w-full flex justify-center py-4">
              <Spinner />
            </div>
          }
          hasMore={hasNextPage}
          scrollableTarget={ref.current}
          endMessage={
            <div className="w-full flex justify-center py-5">
              {products.length !== 0 && (
                <span className="text-lg text-gray-600 font-bold">
                  No hay más Productos para cargar
                </span>
              )}
            </div>
          }
        >
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
            {products.map((product) => {
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
              );
            })}
          </div>
        </InfiniteScroll>

        {isError && toast.error("Error al cargar los productos")}
      </div>
      <div ref={ref.current}></div>
    </>
  );
}
