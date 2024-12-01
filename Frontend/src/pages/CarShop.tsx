import React from "react";
import Card from "../components/Car/Card";

const App: React.FC = () => {
  const product = {
    image: "https://via.placeholder.com/150",
    title: "Gaming Headset XYZ",
    price: 59.99,
    storage: 128,
    ram: 8,
    mpxfront: 16,
    mpxback: 48,
    rating: 4,
    reviews: 120,
  };
  return (
    <div className="bg-gray-100 min-h-screen p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
        <Card
          image={product.image}
          title={product.title}
          price={product.price}
          storage={product.storage}
          ram={product.ram}
          mpxfront={product.mpxfront}
          mpxback={product.mpxback}
          rating={product.rating}
          reviews={product.reviews}
          onRemove={() => alert("Producto eliminado")}
          onConfirm={() => alert("Producto añadido al carrito")}
        />
      </div>
    </div>
  );
};
export default App;
