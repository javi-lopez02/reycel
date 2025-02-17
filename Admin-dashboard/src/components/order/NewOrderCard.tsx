import { FC } from "react";
import { toast } from "sonner";
import { addItemOrderRequest } from "../../services/order";

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
}

const NewOrderCard: FC<Product> = ({ id, image, name, price, setTotalAmount }) => {
  const handleClikAddProduct = () => {
    toast.promise(addItemOrderRequest(id, 1), {
      loading: "Loading...",
      success: (res) => {
        if (res.status !== 200) {
          toast.warning(
            `Aviso: ${res.data.message || "Hubo un problema con la solicitud."}`
          );
          return "La operación no fue completamente exitosa.";
        }
        else{
          setTotalAmount(res.data.data.totalAmount)
          return `${res.data.message}`
        };
      },
      error: "Error al añadir un producto al carrito.",
    });
  };

  return (
    <div className="bg-white p-3 cursor-pointer shadow-sm rounded-md hover:scale-[1.03] transition-all">
      <div className="w-full overflow-hidden mx-auto">
        <img
          src={image}
          alt={name}
          className="aspect-[108/82] w-full object-contain"
        />
      </div>
      <div className="text-left mt-4">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{name}</h3>
        <div className="flex justify-between gap-2">
          <h4 className="text-sm text-sky-900 font-bold mt-2">${price}</h4>
          <button
            onClick={handleClikAddProduct}
            className="text-sm px-1 rounded text-white bg-blue-500 hover:bg-blue-700 font-bold mt-2"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrderCard;
