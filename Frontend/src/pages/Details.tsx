import { useState } from "react";
import { VscError } from "react-icons/vsc";
import { Spinner } from "@nextui-org/spinner";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/auth.context";
import { useProduct } from "../customHooks/useProduct";
import Comment from "../components/Details/Comment";
import FormComment from "../components/Details/FormComment";
import Star from "../components/Details/Star";
import { useDisclosure } from "@nextui-org/react";
import ModalLogin from "./auth/ModalLogin";

export default function Details() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [quantity, setQuantity] = useState(1)
  const [query] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('p') ?? ''
  })

  const {
    rating,
    ratingAverage,
    loading,
    error,
    product,
    comments,
    updateRating,
    createComment,
    addItemCarShop
  } = useProduct(query)

  const { isAuth } = useAuth()

  const handleRating = (value: number) => {
    if (!isAuth) {
      onOpen()
      return
    }
    updateRating(value)
  }

  const handleFormComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isAuth) {
      onOpen()
      return
    }
    const { elements } = event.currentTarget
    const input = elements.namedItem("comment") as RadioNodeList

    await createComment(input.value)

    input.value = ""
  }

  const handleAddCorShop = async () => {
    if (!isAuth) {
      onOpen()
      return
    }
    await addItemCarShop(quantity)
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
                  <button onClick={handleAddCorShop} className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700">
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
                  <Star value={rating} onChange={handleRating}/>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800">Reseñas</h3>
                    <FormComment onSubmit={handleFormComment} />
                    <strong className="pt-2">{comments?.length} reseñas de este producto.</strong>
                    {
                      comments !== null && comments.length > 0 && comments.map((comment) => {
                        return (
                          <Comment
                            key={comment.id}
                            content={comment.content}
                            User={comment.User}
                            createdAt={comment.createdAt}
                          ></Comment>
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

        <ToastContainer theme="light" key={"hola"} icon={<VscError color="red" />} position="bottom-right" />
        <ModalLogin isOpen={isOpen} onOpenChange={onOpenChange}></ModalLogin>

      </div>
    </>
  );
}
