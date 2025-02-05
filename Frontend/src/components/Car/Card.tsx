import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Input, useDisclosure } from "@nextui-org/react";
import { OrderItem, Products } from "../../types";
import { deleteOrderItemRequest } from "../../services/order";
import { Link } from "react-router-dom";
import ModalDelete from "./ModalDelete";

interface Props {
  product: Products,
  quantity: number,
  id: string,
  handleQuantity: (value: string, id: string, price: number) => void,
  setError: (value: string[]) => void,
  setOrder: React.Dispatch<React.SetStateAction<OrderItem[] | null>>
  setCount: React.Dispatch<React.SetStateAction<number>>
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>
}

const Card: React.FC<Props> = ({ product, quantity, id, handleQuantity, setError, setOrder, setCount, setTotalAmount }) => {
  const [value, setvalue] = useState(`${quantity}`);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOrderDelete = () => {
    deleteOrderItemRequest(id)
      .then((res) => {
        setOrder((prev: OrderItem[] | null) => {
          if (!prev) {
            return null;
          }
          return prev?.filter((item) => item.id !== id)
        })
        setCount((count) => {
          return count - 1
        })
        setTotalAmount(res.data.data.totalAmount)
      })
      .catch((error) => {
        console.log(error)
        setError(["Error al elimiar el producto del carrito"])
      })
  }

  return (
    <div className="p-6 bg-white min-w-min shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] rounded-md relative">
      <div className="flex items-center max-sm:flex-col gap-4 max-sm:gap-6">
        <div className="max-w-52 shrink-0">
          <Link to={`/details?p=${product.id}`}>
            <img src={product.imagen} className="w-auto h-full object-contain" />
          </Link>
        </div>

        <div className="sm:border-l sm:pl-4 sm:border-gray-300 w-full">
          <Link to={`/details?p=${product.id}`}>
            <h3 className="text-xl font-bold cursor-pointer text-gray-800">{product.name}</h3>
          </Link>
          {
            product.category.name === "Moviles" && (
              <ul className="mt-4 text-sm text-gray-800 space-y-2">
                <li>Almacenamiento: {product.storage}GB</li>
                <li>RAM: {product.ram}GB</li>
                <li>Camara Frontal: {product.mpxCameraFront}MPX</li>
                <li>Camara Trasera: {product.mpxCameraBack}MPX</li>
              </ul>
            )
          }

          {
            product.category.name !== "Moviles" && (
              <ul className="mt-4 text-sm text-gray-800 space-y-2">
                <li>Descripción: {product.description}</li>
              </ul>
            )
          }


          <hr className="border-gray-300 my-4" />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center max-sm:flex-col">

              <div className="flex items-center">
                <h4 className="text-sm font-bold text-gray-800">Rating:</h4>
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`h-5 w-5 fill-current ${product.ratingAverage !== undefined && product.ratingAverage > index ? "text-yellow-500" : "text-gray-300"
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.368 6.91l6.564-.955L10 0l3.068 5.955 6.564.955-4.878 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div>

              <div className="flex items-center ml-8 max-sm:ml-0 max-sm:mt-2">
                <h4 className="text-sm font-bold text-gray-800">
                  Cantidad:
                </h4>
                <Input
                  className="w-20 pl-2"
                  placeholder="0"
                  labelPlacement="outside"
                  color="primary"
                  value={value}
                  onValueChange={(event) => {
                    if (Number(event) > 0) {
                      setvalue(event)
                      handleQuantity(event, id, product.price)
                    }
                  }}
                  type="number"
                />
              </div>
            </div>

            <div className="flex items-center">
              <h4 className="text-lg font-bold text-gray-800 max-sm:mt-14">${product.price * Number(value)}</h4>
              <button onClick={onOpen}
                className="w-8 h-8 flex items-center justify-center cursor-pointer shrink-0 fill-white rounded-lg bg-red-500 p-1 hover:bg-red-800 absolute top-3.5 right-3.5">
                <FaTimes color="white" />
              </button>
            </div>
          </div>
          <ModalDelete handleOrderDelte={handleOrderDelete} isOpen={isOpen} onClose={onClose} ></ModalDelete>
        </div>
      </div>
    </div>
  );
};
export default Card;
