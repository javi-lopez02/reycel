import { Spinner, useDisclosure } from "@nextui-org/react";
import useProduct from "../../customHooks/useProduct";
import NewOrderCard from "./NewOrderCard";
import { toast } from "sonner";
import ModalAddOrder from "./ModalAddOrder";

export default function NewOrderPage() {
  const { products, error, loading } = useProduct();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="p-10 pt-20 md:pt-20 flex flex-col bg-gray-50 gap-10">
      <h1 className="text-4xl font-medium text-left">Nueva Orden</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="bg-white h-max rounded-md p-6 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] max-sm:w-full md:min-w-max lg:sticky top-16 ">
          <h3 className="text-xl font-bold text-gray-800">Orden</h3>

          <ul className="text-gray-800 text-sm divide-y mt-4">
            <li className="flex flex-wrap gap-4 py-3">
              Subtotal <span className="ml-auto font-bold">$</span>
            </li>
            <li className="flex flex-wrap gap-4 py-3">
              Entrega Rapida <span className="ml-auto font-bold">$4.00</span>
            </li>
            <li className="flex flex-wrap gap-4 py-3">
              Cantidad de productos <span className="ml-auto font-bold">3</span>
            </li>
            <li className="flex flex-wrap gap-4 py-3 font-bold">
              Total <span className="ml-auto">$</span>
            </li>
          </ul>

          <button
            onClick={onOpen}
            type="button"
            className="mt-4 text-sm px-6 py-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Agregar Orden
          </button>
          <ModalAddOrder isOpen={isOpen} onClose={onClose} />
        </div>
        <div className="min-w-4/5">
          {loading && (
            <div className="w-full flex justify-center pt-4">
              <Spinner color="primary" size="md" />
            </div>
          )}

          {products && products.length === 0 && !loading && (
            <div className="w-full flex justify-center pt-4">
              <span className="text-gray-700 font-bold text-md md:text-lg">
                No se encontraron Productos
              </span>
            </div>
          )}
          {!loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {products &&
                products.map((product) => (
                  <NewOrderCard
                    key={product.id}
                    image={product.imagen}
                    name={product.name}
                    price={product.price}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      {error && error.map((err) => toast.error(err))}
    </div>
  );
}
