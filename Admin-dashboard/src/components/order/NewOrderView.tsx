import { Input } from "@nextui-org/react";
import { FC, useState } from "react";
import { OrderItem } from "../../type";
import { deleteOrderItemRequest } from "../../services/order";

interface Product {
  quantity: number;
  image: string;
  name: string;
  price: number;
  id: string;
  inventaryCount: number;
  setError: (value: string[]) => void;
  setOrder: React.Dispatch<React.SetStateAction<OrderItem[] | null>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  handleQuantity: (value: string, id: string, price: number) => void;
}

const NewOrderView: FC<Product> = ({
  id,
  image,
  name,
  quantity,
  price,
  inventaryCount,
  setOrder,
  setCount,
  setTotalAmount,
  setError,
  handleQuantity,
}) => {
  const [value, setvalue] = useState(`${quantity}`);
  const [realPrice, setNewPrice] = useState(price);

  const handleOrderDelete = () => {
    deleteOrderItemRequest(id)
      .then((res) => {
        setOrder((prev: OrderItem[] | null) => {
          if (!prev) {
            return null;
          }
          return prev?.filter((item) => item.id !== id);
        });
        setCount((count) => {
          return count - 1;
        });
        setTotalAmount(res.data.data.totalAmount);
      })
      .catch((error) => {
        console.log(error);
        setError(["Error al elimiar el producto del carrito"]);
      });
  };

  return (
    <div className="bg-white p-3 cursor-pointer shadow-sm rounded-md transition-all">
      <div className="w-full overflow-hidden mx-auto">
        <img
          src={image}
          alt={name}
          className="aspect-[108/82] w-full object-contain"
        />
      </div>
      <div className="text-left mt-4">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{name}</h3>
        <div className="flex justify-between items-center gap-2">
          <h4 className="text-md text-sky-900 font-bold mt-2">${price}</h4>
          <Input
            className="w-16 pl-2 mt-2"
            placeholder="0"
            labelPlacement="outside"
            color="primary"
            value={value}
            onValueChange={(event) => {
              if (Number(event) > 0 && Number(value) < inventaryCount) {
                setvalue(event);
                handleQuantity(event, id, realPrice);
              }
            }}
            type="number"
          />{" "}
          <button
            onClick={handleOrderDelete}
            className="mt-2 min-w-5 min-h-5 text-white bg-red-500 text-sm font-bold rounded"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrderView;
