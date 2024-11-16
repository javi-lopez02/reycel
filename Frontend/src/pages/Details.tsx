import { useState } from "react";
import { VscSend } from "react-icons/vsc";

export default function Details() {
  const [rating, setRating] = useState(0);

  const handleRating = (index) => {
    setRating(index + 1);
  };
  return (
    <div className="bg-white min-h-screen p-4 pt-20 rounded-lg shadow-md max-w-full max-h-full mx-auto mt-1">
      <div className="flex flex-col md:grid md:grid-cols-2 md:justify-evenly">
        <div className="md:w-2/5 md:fixed md:left-20">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIVLSzhGPgR2ps1Glfd4ki5InOTbQfrZdzZw&s"
            alt="Product"
            className="md:w-11/12 w-full rounded-lg"
          />
        </div>
        <div className="md:w-full md:pr-8 mt-4 md:mt-0 md:col-start-2">
          <h1 className="text-4xl font-semibold text-gray-800">
            Nombre del Producto
          </h1>
          <p className="text-2xl text-gray-600 mt-2">$999.99</p>
          <div className="mt-4">
            <span className="text-green-600 font-medium">En stock</span>
          </div>
          <div className="mt-4">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700">
              Agregar al carrito
            </button>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Descripción del producto
            </h2>
            <p className="mt-2 text-gray-600">
              Aquí va la descripción detallada del producto. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Valoraciones y Reseñas
            </h2>
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`h-5 w-5 fill-current cursor-pointer ${
                      rating > index ? "text-yellow-500" : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    onClick={() => handleRating(index)}
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.368 6.91l6.564-.955L10 0l3.068 5.955 6.564.955-4.878 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 ml-2">{rating} de 5</span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Reseñas</h3>
              <div className="mt-2 flex items-center">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full pl-4 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <VscSend className="absolute right-14 h-8 w-8 hover:text-blue-500" />
              </div>
              <div className="mt-2">
                <p className="text-gray-700 font-medium">Juan Pérez</p>
                <p className="text-gray-600">
                  ¡Excelente producto! Superó mis expectativas.
                </p>
              </div>
              <div className="mt-2">
                <p className="text-gray-700 font-medium">María González</p>
                <p className="text-gray-600">
                  Buena calidad, pero el envío fue un poco lento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
