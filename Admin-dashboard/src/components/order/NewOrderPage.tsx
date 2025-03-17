import { Spinner, useDisclosure } from "@nextui-org/react";
import useProduct from "../../customHooks/useProduct";
import NewOrderCard from "./NewOrderCard";
import { toast } from "sonner";
import ModalAddOrder from "./ModalAddOrder";
import useOrder from "../../customHooks/useOrder";
import { useEffect, useState } from "react";
import { OrderItem } from "../../type";
import {
  getOrderItemsRequest,
  updateOrderItemRequest,
} from "../../services/order";
import { useAuth } from "../../context/AuthContext";
import NewOrderView from "./NewOrderView";

export default function NewOrderPage() {
  const { products, error, loading } = useProduct();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { orders } = useOrder();
  const [totalAmount, setTotalAmount] = useState(0);
  const [count, setCount] = useState(0);
  const [errors, setErrors] = useState<Array<string> | null>(null);
  const [items, setItems] = useState<OrderItem[] | null>(null);
  const { user } = useAuth();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);

    orders?.map((order) => {
      if (order.user.id === user?.userId) {
        setLoad(false);

        getOrderItemsRequest(order.id)
          .then((res) => {
            setTotalAmount(res.data.data.totalAmount);
            setItems(res.data.data.orderItems);
            setCount(res.data.data._count.orderItems);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error al cargar los productos");
          })
          .finally(() => {
            setLoad(false);
          });
      }
    });
  }, [orders, user, totalAmount]);

  const handleQuantity = (value: string, id: string, price: number) => {
    try {
      updateOrderItemRequest(id, Number(value), price).then((res) => {
        setTotalAmount(res.data.data.totalAmount);
      });
    } catch (error) {
      console.log(error);
      setErrors(["Error al incrementar el producto"]);
    }
  };

  return (
    <div className="p-10 pt-20 md:pt-20 flex flex-col bg-gray-50 gap-10">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="bg-gray-200 h-max rounded-md p-6 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] sm:min-w-80 md:min-w-80 lg:min-w-[450px] xl:min-w-[500px] lg:sticky top-16 ">
          <h3 className="w-full text-center text-xl font-bold text-gray-800">
            Nueva Orden
          </h3>

          <div className="flex w-full justify-center">
            <ul className="text-gray-800 text-sm divide-x flex gap-4 mt-4">
              <li className="flex flex-wrap gap-4 py-3">
                Cantidad de productos{" "}
                <span className="ml-auto font-bold">{count}</span>
              </li>
              <li className="flex flex-wrap gap-4 py-3 font-bold pl-4">
                Total <span className="ml-auto">${totalAmount}</span>
              </li>
            </ul>
          </div>

          {load && (
            <div className="min-w-full min-h-full flex items-center justify-center">
              <Spinner></Spinner>
            </div>
          )}

          <div className="mt-2 grid grid-cols-3 sm:grid-cols-2 gap-2 sm:max-h-80 overflow-auto  scrollbar-default">
            {items &&
              !load &&
              items.map((item) => (
                <NewOrderView
                  id={item.id}
                  key={item.id}
                  image={item.product.imagen}
                  name={item.product.name}
                  price={item.price}
                  inventaryCount={item.product.inventaryCount}
                  quantity={item.quantity}
                  setOrder={setItems}
                  setTotalAmount={setTotalAmount}
                  setCount={setCount}
                  setError={setErrors}
                  handleQuantity={handleQuantity}
                />
              ))}
          </div>

          <button
            onClick={onOpen}
            type="button"
            className="mt-4 text-sm px-6 py-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Agregar Orden
          </button>
          <ModalAddOrder
            isOpen={isOpen}
            onClose={onClose}
            totalAmount={totalAmount}
            username={user?.username}
          />
        </div>
        <div className="min-w-4/5">
          {loading && (
            <div className="w-full flex justify-center pt-4">
              <Spinner color="primary" size="md" />
            </div>
          )}

          {products && products.length === 0 && !loading && (
            <div className="w-full flex justify-center pt-4">
              <span className="text-gray-700 font-bold text-md md:text-lg">
                No se encontraron Productos
              </span>
            </div>
          )}
          {!loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products &&
                products.map((product) => (
                  <NewOrderCard
                    setTotalAmount={setTotalAmount}
                    id={product.id}
                    key={product.id}
                    image={product.imagen}
                    name={product.name}
                    price={product.price}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      {error && error.map((err) => toast.error(err))}
      {errors && errors.map((err) => toast.error(err))}
    </div>
  );
}
