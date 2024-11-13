// src/components/PhoneCard.tsx
import { FC } from "react";

interface PhoneCardProps {
  image: string;
  title: string;
  price: number;
  description: string;
}

const Card: FC<PhoneCardProps> = ({ image, title, price, description }) => {
  return (
    <div className="max-w-64 max-h-96  mx-auto w-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-64 h-56 object-contain " src={image} alt={title} />
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm">
          Precio: <span className="text-green-600 font-bold">{price}$</span>
        </p>
        <div className="flex items-center mt-2">{description}</div>
        {/* <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
          Add to Cart
        </button> */}
      </div>
    </div>
  );
};

export default Card;
