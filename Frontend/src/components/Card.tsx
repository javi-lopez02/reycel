// src/components/PhoneCard.tsx
import {FC} from "react";

interface PhoneCardProps {
  image: string;
  title: string;
  price: string;
  rating: number;
  reviews: number;
}

const Card: FC<PhoneCardProps> = ({
  image,
  title,
  price,
  rating,
  reviews,
}) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-64 object-cover" src={image} alt={title} />
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm">
          Precio: <span className="text-green-600 font-bold">{price}</span>
        </p>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`h-5 w-5 ${
                index < rating ? "text-yellow-500" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .288l2.833 8.718h9.167l-7.4 5.37 2.833 8.718-7.4-5.37-7.4 5.37L5.4 14.375.288 9.006h9.167z" />
            </svg>
          ))}
          <span className="text-gray-600 text-sm ml-2">{reviews} reviews</span>
        </div>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
