import Card from "../components/Shop/Card";
import HeadingFilters from "../components/Shop/HeadingFilters"
import { useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { VscError } from "react-icons/vsc";
import { useProduct } from "../context/product.context";
import { Spinner } from "@nextui-org/spinner";

export default function NewShop() {
  const { products, isNextPage, error, loading, currentPage, errorSerch, setCurrentPage, searchProduct } = useProduct()

  const ref = useRef()

  useEffect(() => {
    searchProduct()
  }, [currentPage, searchProduct])
  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 pt-5 2xl:px-0">
        {/* <!-- Heading & Filters --> */}
        <HeadingFilters />
        <div>
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
                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                  {
                    products.map((protuct) => {
                      return (
                        <Card
                          key={protuct.id}
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
      {/* <!-- Filter modal --> */}

    </section>
  );
}

