import { useEffect, useRef } from "react";
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { VscError } from "react-icons/vsc";
import { useProduct } from "../context/product.context";
import { Spinner } from "@nextui-org/spinner";

export default function Shop() {
  const { products, isNextPage, error, loading, currentPage, errorSerch, setCurrentPage, searchProduct } = useProduct()

  const ref = useRef()

  useEffect(() => {
    searchProduct()
  }, [currentPage, searchProduct])

  return (
    <>
      <div className="flex justify-end h-screen">

        <div className="pt-16 xl:w-5/6 w-full scrollbar-hide">
          {
            !loading && errorSerch && (
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
            loading && (
              <div className="w-full flex justify-center pt-4">
                <Spinner color="primary" />
              </div>
            )
          }
          {
            !loading && products.length === 0 && !errorSerch && (
              <div className="w-full flex justify-center pt-4">
                <span className="text-gray-700 font-bold text-lg">No se encontraron Prosuctos</span>
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
                    <span className="text-lg text-gray-600 font-bold">No hay más Productos para cargar</span>
                  </div>
                }>
                <div className="w-full listProduct pt-2 px-2">
                  {
                    products.map((protuct) => {
                      return (
                        <Card
                          key={protuct.id}
                          image={protuct.imagen}
                          title={protuct.name}
                          price={protuct.price}
                          description={protuct.description}
                        />
                      )
                    })

                  }</div>
              </InfiniteScroll>
            )
          }

          {
            error && (
              error.map((err) => toast(err))
            )
          }

          <ToastContainer theme="light" icon={<VscError color="red" />} position="bottom-right" />
        </div>
        <div ref={ref.current}></div>
      </div>
    </>
  );
}
