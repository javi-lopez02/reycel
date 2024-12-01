import React from "react";
import { FaStar, FaTimes } from "react-icons/fa";
interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  storage: number
  ram: number
  mpxfront: number
  mpxback: number
  rating: number;
  reviews: number;
  onRemove: () => void;
  onConfirm: () => void;
}
const Card: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  storage,
  ram,
  mpxfront,
  mpxback,
  rating,
  reviews,
  onRemove,
  onConfirm,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center relative">
      <button
        className="absolute top-1 right-1 p-1 md:top-2 md:right-2 md:p-2 text-gray-700 hover:text-red-600"
        onClick={onRemove}
      >
        <FaTimes size={18} />
      </button>
      <div className="w-full md:w-2/5">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="w-full min-h-full md:w-3/5 p-4 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < rating ? "text-yellow-500" : "text-gray-300"}
            />
          ))}
          <span className="text-gray-600 ml-2">({reviews} reviews)</span>
        </div>
        <p className="text-lg font-semibold text-gray-900">
          ${price.toFixed(2)}
        </p>
        <p className="text-gray-700 mb-4">
          Incluye almacenamiento de {storage}GB, RAM de {ram}GB, cámara frontal de {mpxfront}MP y
          cámara trasera de {mpxback}MP. Ideal para tus necesidades diarias y más.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 flex-end"
          onClick={onConfirm}
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  );
};
export default Card;
