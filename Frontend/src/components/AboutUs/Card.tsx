import { FC } from "react";
import { FaPhoneSquareAlt, FaAddressCard, FaCity } from "react-icons/fa";

interface SedeCardProps {
  image: string;
  phone: number;
  municipe: string;
  address: string;
}

const Card: FC<SedeCardProps> = ({ image, phone, municipe, address }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={image} alt="" />
      <div className="p-5 flex flex-col gap-2">
        <h5 className="flex items-center text-2xl font-bold tracking-tight text-gray-900">
          <FaPhoneSquareAlt className="text-blue-400 min-h-9 min-w-9 mr-3" />
          +53{phone}
        </h5>
        <p className="flex items-center font-semibold text-large text-gray-900">
          <FaAddressCard className="text-blue-400 min-h-9 min-w-9 mr-3" />
          {address}
        </p>
        <p className="flex items-center font-semibold text-large text-gray-900">
          <FaCity className="text-blue-400 min-h-9 min-w-9 mr-3" /> {municipe}
        </p>
      </div>
    </div>
  );
};

export default Card;
