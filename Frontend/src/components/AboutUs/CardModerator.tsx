import { FC } from "react";

interface ModeratorProps {
  imageModerator: string;
  nameModerator: string;
  phoneModerator: string;
}

const CardModerator: FC<ModeratorProps> = ({
  imageModerator,
  nameModerator,
  phoneModerator,
}) => {
  return (
    <div className="flex flex-wrap self-center items-center cursor-pointer border border-gray-300 rounded-lg w-4/5 px-4 py-2 mb-4">
      <img src={imageModerator} className="w-9 h-9 rounded-full" />
      <div className="ml-4 flex-1">
        <p className="text-sm text-gray-800 font-semibold">{nameModerator}</p>
        <p className="text-xs text-gray-500 mt-0.5">{phoneModerator}</p>
      </div>
    </div>
  );
};

export default CardModerator;
