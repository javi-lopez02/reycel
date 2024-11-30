/* eslint-disable react-hooks/exhaustive-deps */
import { Rating as RetingStart, RoundedStar } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import { VscError, VscSend } from "react-icons/vsc";
import { createCommentRequest, productIDRequest } from '../services/product'
import { Products, type Rating, Comment } from "../types";
import axios, { AxiosError } from "axios";
import { Spinner } from "@nextui-org/spinner";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/auth.context";
import { ratingRequest } from '../services/rating'


interface Product extends Products {
  Rating: Rating[];
}

export default function Details() {
  const [rating, setRating] = useState(0)
  const [ratingAverage, setRatingAverage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Array<string> | null>(null);
  const [product, setProduct] = useState<Product | null>(null)
  const [comments, setComments] = useState<Comment[] | null>(null)
  const [query] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('p') ?? ''
  })

  const { user, isAuth } = useAuth()

  useEffect(() => {
    setError(null)
    setLoading(true)
    productIDRequest(query)
      .then((res) => {
        setRatingAverage(res.data.averageRating)
        setProduct(res.data.data)
        setComments(res.data.data.comment)

        const userRating = res.data.data.Rating.find(
          (r: Rating) => r.userID === user?.userId
        );
        if (userRating) {
          setRating(userRating.value);
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
      }).finally(() => {
        setLoading(false)
      });

  }, [query])

  const handleRating = (value: number) => {
    if (!isAuth) {
      alert("debe iniciar secion ")
      return
    }
    try {
      if (product?.id) {
        ratingRequest(product.id, value).then(res => setRatingAverage(res.data.ratingAverage))
      }
      setRating(value)
    } catch (error) {
      setError(["Error con la peticion... "])
      console.log(error)
    }
  }

  const handleFormComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isAuth) {
      alert("debe registrarce")
      return
    }

    const { elements } = event.currentTarget
    const input = elements.namedItem("comment") as RadioNodeList

    try {
      if (input.value.length > 0) {
        const newComment = await createCommentRequest(input.value as string, query)
        setComments((prevComment) =>{
          return prevComment?.concat(newComment.data.data) as Comment[]
        })
      }
    } catch (error) {
      console.log(error)
      setError(["Error al crear el comentario"])
    } finally {
      input.value = ""
    }


  }

  return (
    <>
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
                <p className="text-2xl text-gray-600 mt-2">${product.price}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`h-5 w-5 fill-current ${ratingAverage > index ? "text-yellow-500" : "text-gray-300"
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
                {
                  product.inventoryCount >= 1 && (
                    <div className="mt-3">
                      <span className="text-green-600 font-medium">En stock</span>
                    </div>
                  )
                }

                {
                  product.inventoryCount === 0 && (
                    <span className="me-2 rounded bg-red-400 px-2.5 py-0.5 text-xs font-medium text-zinc-100">
                      {" "}
                      No hay uniddades{" "}
                    </span>
                  )
                }
                {
                  product.inventoryCount <= 4 && product.inventoryCount !== 0 && (
                    <span className="me-2 py-0.5 text-sm font-medium text-red-400">
                      {`Queda(n) ${product.inventoryCount} hay más unidades en camino`}
                    </span>

                  )
                }

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
                    <RetingStart style={{ maxWidth: 200 }} value={rating} onChange={handleRating} itemStyles={{
                      itemShapes: RoundedStar,
                      activeFillColor: '#ffb700',
                      inactiveFillColor: '#fbf1a9'
                    }} />
                    <span className="text-gray-600 ml-2">{rating} de 5</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800">Reseñas</h3>
                    <form className="mt-2 flex items-center pb-3" onSubmit={handleFormComment}>
                      <input
                        type="text"
                        name="comment"
                        placeholder="Write a comment..."
                        className="w-full pl-4 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="absolute right-14">
                        <VscSend className=" h-8 w-8 hover:text-blue-500" />
                      </button>
                    </form>
                    <strong className="pt-2">{comments?.length} reseñas de este producto.</strong>
                    {
                      comments !== null && comments.length > 0 && comments.map((comment) => {
                        return (
                          <div key={comment.id} className="mt-2">
                            <p className="text-gray-700 font-medium">{comment.User.username}</p>
                            <p className="text-gray-600">
                              {comment.content}
                            </p>
                          </div>
                        )
                      })
                    }
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
    </>
  );
}
