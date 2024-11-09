// src/components/PhoneCard.tsx
import { FC } from "react";

interface PhoneCardProps {
  image: string;
  title: string;
  price: string;
  description: string;
  especif: string;
}

const CarCard: FC<PhoneCardProps> = ({ image, title, price, description, especif }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-56 object-cover" src={image} alt={title} />
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm">
          Precio: <span className="text-green-600 font-bold">{price}</span>
        </p>
        <div className="flex items-center mt-2">{description}</div>
        <div className="flex items-center mt-2">{especif}</div>
        <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg">
          Delete from Car
        </button>
      </div>
    </div>
  );
};

export default CarCard;
