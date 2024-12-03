import React from "react";
import Card from "../components/Car/Card";

const App: React.FC = () => {
  const product = {
    image: "https://expresssolutionscuba.com/wp-content/uploads/2023/04/x1000070707-510x510.jpg.pagespeed.ic.xmPKnZf7uB.jpg",
    title: "Redmi Note 13 Plus",
    price: 59.99,
    storage: 128,
    ram: 8,
    mpxfront: 16,
    mpxback: 48,
    rating: 4,
  };
  return (
    <div className="font-[sans-serif] min-h-screen bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-50 pt-16">
      <div className="max-w-7xl max-lg:max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-extrabold text-gray-800">
          Tu carrito de compras
        </h2>

        <div className="grid lg:grid-cols-3 gap-4 relative mt-8">
          <div className="lg:col-span-2 space-y-4">
            {[...Array(3)].map((_, index) => {
              return (
                <Card
                  key={index}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  storage={product.storage}
                  ram={product.ram}
                  mpxfront={product.mpxfront}
                  mpxback={product.mpxback}
                  rating={product.rating}
                />
              );
            })}
          </div>

          <div className="bg-white h-max rounded-md p-6 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] sticky top-16">
            <h3 className="text-xl font-bold text-gray-800">Orden</h3>

            <ul className="text-gray-800 text-sm divide-y mt-4">
              <li className="flex flex-wrap gap-4 py-3">
                Subtotal <span className="ml-auto font-bold">$2120.00</span>
              </li>
              <li className="flex flex-wrap gap-4 py-3">
                Entrega Rapida  <span className="ml-auto font-bold">$4.00</span>
              </li>
              <li className="flex flex-wrap gap-4 py-3">
                Tax <span className="ml-auto font-bold">$4.00</span>
              </li>
              <li className="flex flex-wrap gap-4 py-3 font-bold">
                Total <span className="ml-auto">$2920.00</span>
              </li>
            </ul>

            <button
              type="button"
              className="mt-4 text-sm px-6 py-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Realizar Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
