import React, { useState } from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { Input } from "@nextui-org/react";
import ModalDelete from "./ModalDelete";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  storage: number;
  ram: number;
  mpxfront: number;
  mpxback: number;
  rating: number;
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
}) => {
  const [value, setvalue] = useState("1");

  return (
    <div className="p-6 bg-white shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] rounded-md relative">
      <div className="flex items-center max-sm:flex-col gap-4 max-sm:gap-6">
        <div className="w-52 shrink-0">
          <img src={image} className="w-full h-full object-contain" />
        </div>

        <div className="sm:border-l sm:pl-4 sm:border-gray-300 w-full">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>

          <ul className="mt-4 text-sm text-gray-800 space-y-2">
            <li>Almacenamiento: {storage}GB</li>
            <li>RAM: {ram}GB</li>
            <li>Camara Frontal: {mpxfront}MPX</li>
            <li>Camara Trasera: {mpxback}MPX</li>
          </ul>

          <hr className="border-gray-300 my-4" />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <h4 className="text-sm font-bold text-gray-800">Rating:</h4>
              <Rating
                style={{ maxWidth: 100 }}
                value={rating}
                readOnly
                itemStyles={{
                  itemShapes: RoundedStar,
                  activeFillColor: "#ffb700",
                  inactiveFillColor: "#fbf1a9",
                }}
              />
              <h4 className="text-sm font-bold ml-8 text-gray-800">
                Cantidad:
              </h4>
              <Input
                className="w-20"
                placeholder="0"
                labelPlacement="outside"
                color="primary"
                value={value}
                onValueChange={setvalue}
                type="number"
              />
            </div>

            <div className="flex items-center">
              <h4 className="text-lg font-bold text-gray-800">${price}</h4>
              <ModalDelete/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
