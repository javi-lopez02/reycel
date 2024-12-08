import React, { useEffect, useState } from "react";
import Card from "../components/Car/Card";
import { OrderItem } from "../types";
import { getOrderRequest, updateOrderItemRequest } from "../services/order";
import axios, { AxiosError } from "axios";
import { Spinner } from "@nextui-org/spinner";
import {toast} from 'sonner'

const App: React.FC = () => {

  const [order, setOrder] = useState<OrderItem[] | null>(null)
  const [totalAmount, setTotalAmount] = useState(0)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState<Array<string> | null>(null);

  useEffect(() => {
    setLoading(true)
    setError(null)
    getOrderRequest()
      .then(res => {
        setOrder(res.data.data.orderItems)
        setTotalAmount(res.data.data.totalAmount)
        setCount(res.data.data._count.orderItems)
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
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])


  const handleQuantity = (value: string, id: string, price: number) => {
    try {
      updateOrderItemRequest(id, Number(value), price)
      .then((res)=>{
        setTotalAmount(res.data.data.totalAmount)
      })

    } catch (error) {
      console.log(error)
      setError(["Error al incrementar el producto"])
    }
  }



  return (
    <div className="font-[sans-serif] min-h-screen bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-50 pt-16">
      <div className="max-w-7xl max-lg:max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-extrabold text-gray-800">
          Tu carrito de compras
        </h2>

        <div className="grid lg:grid-cols-3 gap-4 relative mt-8">
          <div className="lg:col-span-2 space-y-4">

            {order !== null && order.map((orderItem) => {
              return (
                <Card
                  key={orderItem.product.id}
                  id={orderItem.id}
                  product={orderItem.product}
                  quantity={orderItem.quantity}
                  handleQuantity={handleQuantity}
                  setCount={setCount}
                  setError={setError}
                  setOrder={setOrder}
                  setTotalAmount={setTotalAmount}
                />
              );
            })}

            {
              loading &&
              <div className="w-full flex justify-center pt-4">
                <Spinner color="primary" />
              </div>
            }


            {
              error && (
                error.map((err) => toast.error(err))
              )
            }

            

          </div>

          <div className="bg-white h-max rounded-md p-6 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] sticky top-16">
            <h3 className="text-xl font-bold text-gray-800">Orden</h3>

            <ul className="text-gray-800 text-sm divide-y mt-4">
              <li className="flex flex-wrap gap-4 py-3">
                Subtotal <span className="ml-auto font-bold">${totalAmount}</span>
              </li>
              <li className="flex flex-wrap gap-4 py-3">
                Entrega Rapida  <span className="ml-auto font-bold">$4.00</span>
              </li>
              <li className="flex flex-wrap gap-4 py-3">
                Cantidad de productos <span className="ml-auto font-bold">{count}</span>
              </li>
              <li className="flex flex-wrap gap-4 py-3 font-bold">
                Total <span className="ml-auto">${totalAmount}</span>
              </li>
            </ul>

            <button
              type="button"
              className="mt-4 text-sm px-6 py-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Realizar Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
