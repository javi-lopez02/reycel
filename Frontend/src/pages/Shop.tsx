import { useEffect, useRef } from "react";
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { VscError } from "react-icons/vsc";
import { useProduct } from "../context/product.context";


export default function Shop() {
  const { products, isNextPage, error, loading ,currentPage, errorSerch, setCurrentPage, searchProduct } = useProduct()

  const ref = useRef()

  useEffect(() => {
    searchProduct()
  }, [currentPage, searchProduct])

  return (
    <>
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
        loading &&(
          <div className="w-full flex justify-center pt-4">
            <span className="text-gray-700 font-bold text-lg">Cargando ...</span>
          </div>
        )
      }
      {
        !loading && products.length === 0 && !errorSerch && (
          <div className="w-full flex justify-center pt-4">
            <span className="text-gray-700 font-bold text-lg">No se encontraron elemntos</span>
          </div>
        )
      }
      {
        !loading && !errorSerch && (
          <InfiniteScroll
            dataLength={products.length}
            next={() => {
              console.log("is next page", isNextPage)
              console.log("current page", currentPage)
              setCurrentPage(currentPage + 1)
            }}
            loader={<h1>Loading...</h1>}
            hasMore={isNextPage}
            scrollableTarget={ref.current}
            endMessage={
              <p>
                <b>No hay mas elementos q cargar</b>
              </p>
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
      <div ref={ref.current}></div>
      <ToastContainer theme="light" icon={<VscError color="red" />} position="bottom-right" />
    </>
  );
}
