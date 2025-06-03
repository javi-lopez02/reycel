import { useEffect, useState } from "react";
import { createCommentRequest, productIDRequest } from '../services/product'
import { type Products, type Comment, type Rating } from "../types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ratingRequest } from '../services/rating'
import { addItemOrderRequest } from "../services/order";
import { useUserStore } from "../store/useUserStore";
import { toast } from "sonner";

interface Product extends Products {
  Rating: Rating[];
}

export const useProductDetails = (query: string) => {
  const [rating, setRating] = useState(0)
  const [ratingAverage, setRatingAverage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Array<string> | null>(null);
  const [product, setProduct] = useState<Product | null>(null)
  const [comments, setComments] = useState<Comment[] | null>(null)

  const { user } = useUserStore()

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
            toast.error("No se recibió respuesta:");
          }
        } else {
          toast.error("Error desconocido:");
          setError(["Error con la peticion al servidor"]);
        }
      }).finally(() => {
        setLoading(false)
      });

  }, [query, user])

  const updateRating = (value: number) => {
    try {
      if (product?.id) {
        ratingRequest(product.id, value).then(res => setRatingAverage(res.data.ratingAverage))
      }
      setRating(value)
    } catch (error) {
      setError(["Error con la peticion... "])
    }
  }
  const createComment = async (value: string) => {
    try {
      if (value.length > 0) {
        const newComment = await createCommentRequest(value, query)
        setComments((prevComment) => {
          return prevComment?.concat(newComment.data.data) as Comment[]
        })
      }
    } catch (error) {
      setError(["Error al crear el comentario"])
    }
  }

  const addItemCarShop = async (quantity: number): Promise<AxiosResponse> => {
    try {
      const response =  await addItemOrderRequest(query, quantity)
      return response
    } catch (error) {
      setError(["Error al añadir el producto"])
      throw new Error("Error al añadir el producto"); 
    }
  }

  return { rating, ratingAverage, loading, error, product, comments, updateRating, createComment, addItemCarShop, setComments }
}
