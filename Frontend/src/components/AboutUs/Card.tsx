import { FC } from "react";
import { FaPhone, FaMapLocationDot } from "react-icons/fa6";
import CardModerator from "./CardModerator";

interface SedeCardProps {
  image: string;
  phone: number;
  address: string;
  warkers: {
    id: string;
    email: string;
    username: string;
    image: string;
  }[];
}

const Card: FC<SedeCardProps> = ({ image, phone, warkers, address }) => {
  return (
    <div className="max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg min-w-full max-h-56 object-cover"
        src={image}
        alt=""
      />
      <div className="p-5 flex flex-col gap-2">
        <span className="flex items-center text-lg font-bold tracking-tight text-gray-900">
          <FaPhone className="text-blue-500 min-h-5 min-w-5 mr-3" />
          +53{phone}
        </span>
        <span className="flex items-center font-semibold text-md text-gray-900">
          <FaMapLocationDot className="text-blue-500 min-h-5 min-w-5 mr-3" />
          {address}
        </span>
      </div>
      {warkers.map((warker) => {
        return (
          <CardModerator
            key={warker.id}
            imageModerator={warker.image}
            nameModerator={warker.username}
            phoneModerator={warker.email}
          />
        );
      })}
    </div>
  );
};

export default Card;
