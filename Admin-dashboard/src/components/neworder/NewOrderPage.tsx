import { Button, Input, Spinner, useDisclosure } from "@nextui-org/react";
import { useState, useMemo } from "react";
import useProduct from "../../customHooks/useProduct";
import { toast } from "sonner";
import NewOrderCard from "./NewOrderCard";
import DrawerOrderView from "./DrawerOrderView";
import { useNewOrderStore } from "../../store/useProductStore";

export default function NewOrderPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { products, loading, error } = useProduct();
  const { setOrder } = useNewOrderStore();

  const [searchFilter, setSearchFilter] = useState("");

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    if (!searchFilter.trim()) {
      return products;
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [products, searchFilter]);

  return (
    <>
      <div className="py-20 px-10">
        {/* Filtro por nombre */}
        <div className="mb-4 w-full flex justify-between px-10 gap-6">
          <Input
            type="text"
            placeholder="Buscar productos por nombre..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            variant="bordered"
            color="primary"
            className="w-2/3"
          />
          <Button variant="solid" color="primary" onPress={onOpen}>
            <>
              <svg
                className="min-h-8 min-w-8"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                />
              </svg>
              Ver Lista
            </>{" "}
          </Button>
        </div>

        {filteredProducts?.length === 0 && !loading && (
          <div className="w-full flex justify-center pt-4">
            <span className="text-gray-700 font-bold text-lg">
              {searchFilter.trim()
                ? "No se encontraron productos que coincidan con la búsqueda"
                : "No se encontraron Productos"}
            </span>
          </div>
        )}

        {loading && (
          <div className="w-full flex justify-center py-4">
            <Spinner />
          </div>
        )}

        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
          {filteredProducts?.map((product) => {
            return <NewOrderCard product={product} setOrder={setOrder} />;
          })}
        </div>
        {<DrawerOrderView isOpen={isOpen} onClose={onClose}></DrawerOrderView>}
        {error && toast.error("Error al cargar los productos")}
      </div>
    </>
  );
}
