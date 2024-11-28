import { Rating, RoundedStar } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import { VscError, VscSend } from "react-icons/vsc";
import { productIDRequest } from '../services/product'
import { Products } from "../types";
import axios, { AxiosError } from "axios";
import { Spinner } from "@nextui-org/spinner";
import { toast, ToastContainer } from "react-toastify";

export default function Details() {
  const [rating, setRating] = useState(0)
  const [ratingAverage, setRatingAverage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Array<string> | null>(null);
  const [product, setProduct] = useState<Products | null>(null)
  const [query] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('p') ?? ''
  })

  useEffect(() => {
    setError(null)
    setLoading(true)
    productIDRequest(query)
      .then((res) =>{
        setRatingAverage(res.data.averageRating) 
        setProduct(res.data.data)
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
  }, [query])

  const handleRating = async (value: number) =>{
    try {
      setRating(value)
    } catch (error) {
      setError(["Error con la peticion... "])
      console.log(error)
    }
  }

  return (
    <div className="bg-white min-h-screen p-4 pt-20 rounded-lg shadow-md max-w-full max-h-full mx-auto mt-1">
      {
        product && (
          <div className="flex flex-col md:grid md:grid-cols-2 md:justify-evenly">
            <div className="md:w-2/5 md:fixed md:left-20">
              <img
                src={product.imagen}
                alt={product.name}
                className="md:w-11/12 w-full rounded-lg"
              />
            </div>
            <div className="md:w-full md:pr-8 mt-4 md:mt-0 md:col-start-2">
              <h1 className="text-4xl font-semibold text-gray-800">
                {`${product.name},  Ram ${product.ram}GB, Almacenamiento ${product.storage}GB `}
              </h1>
              <p className="text-2xl text-gray-600 mt-2">$999.99</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`h-5 w-5 fill-current ${product.rating > index ? "text-yellow-500" : "text-gray-300"
                          }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.368 6.91l6.564-.955L10 0l3.068 5.955 6.564.955-4.878 4.635 1.122 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">{ratingAverage} de 5</span>

                </div>
              </div>
              <div className="mt-3">
                <span className="text-green-600 font-medium">En stock</span>
              </div>

              <div className="mt-4">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700">
                  Agregar al carrito
                </button>
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Descripción del producto
                </h2>
                <p className="mt-2 text-gray-600">
                  {product.description}
                </p>
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Valoraciones y Reseñas
                </h2>
                <div className="flex items-center mt-2">
                  <Rating style={{ maxWidth: 200 }} value={rating} onChange={handleRating} itemStyles={{
                    itemShapes: RoundedStar,
                    activeFillColor: '#ffb700',
                    inactiveFillColor: '#fbf1a9'
                  }} />
                  <span className="text-gray-600 ml-2">{rating} de 5</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">Reseñas</h3>
                  <div className="mt-2 flex items-center">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="w-full pl-4 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <VscSend className="absolute right-14 h-8 w-8 hover:text-blue-500" />
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-700 font-medium">Juan Pérez</p>
                    <p className="text-gray-600">
                      ¡Excelente producto! Superó mis expectativas.
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-700 font-medium">María González</p>
                    <p className="text-gray-600">
                      Buena calidad, pero el envío fue un poco lento.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        loading && (
          <div className="w-full h-screen flex justify-center items-center">
            <Spinner size="lg" color="primary" />
          </div>
        )
      }
      {
        error && (
          error.map((err) => toast(err))
        )
      }

      <ToastContainer theme="light" icon={<VscError color="red" />} position="bottom-right" />

    </div>
  );
}
