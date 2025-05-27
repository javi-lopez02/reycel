import { Spinner } from "@nextui-org/react";
import useProduct from "../../customHooks/useProduct";
import NewOrderCard from "./NewOrderCard";
import { toast } from "sonner";
import DrawerOrderView from "./DrawerOrderView";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function NewOrderPage() {
  const { products, error, loading } = useProduct();
  const { user } = useAuth();
  const pendingOrder = user?.orders.find((order) => order.pending === true);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  return (
    <div className="p-10 pt-20 md:pt-20 flex bg-gray-50 gap-10">
      <div className="flex flex-col sm:flex-row gap-4">
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
                    id={product.id}
                    key={product.id}
                    image={product.imagen}
                    name={product.name}
                    price={product.price}
                    setTotalAmount={setTotalAmount}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      {error && error.map((err) => toast.error(err))}
      <div className="flex items-center h-10">
        <DrawerOrderView
          orderId={pendingOrder?.id}
          userId={user?.id}
          totalAmount={totalAmount}
          setTotalAmount={setTotalAmount}
        />
      </div>
    </div>
  );
}
