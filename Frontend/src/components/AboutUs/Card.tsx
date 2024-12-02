import { FC } from "react";
import { FaPhone, FaMapLocationDot } from "react-icons/fa6";

interface SedeCardProps {
  image: string;
  phone: number;
  municipe: string;
  address: string;
}

const Card: FC<SedeCardProps> = ({ image, phone, municipe, address }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg min-w-full max-h-56 object-cover" src={image} alt="" />
      <div className="p-5 flex flex-col gap-2">
        <span className="flex items-center text-lg font-bold tracking-tight text-gray-900">
          <FaPhone className="text-blue-500 min-h-5 min-w-5 mr-3" />
          +53{phone}
        </span>
        <span className="flex items-center font-semibold text-md text-gray-900">
          <FaMapLocationDot className="text-blue-500 min-h-5 min-w-5 mr-3" />
          {address} {municipe}
        </span>
      </div>
    </div>
  );
};

export default Card;
