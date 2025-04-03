import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
  Input,
  Button,
  // RadioGroup,
  // Radio,
} from "@heroui/react";
import { FC, Key, useEffect, useState } from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Category, SortOption } from "../../types";
import { useFilterStore } from "../../store/useFilterStore";

interface FiltersProps {
  categories: Category[];
}

export const orders = [
  { key: "masViejo", label: "Más Antiguo" },
  { key: "masNuevo", label: "Más Reciente" },
  { key: "precioCreciente", label: "Menor Precio" },
  { key: "precioDecreciente", label: "Mayor Precio" },
  { key: "masPopular", label: "Mayor Rating" },
  { key: "menosPopular", label: "Menor Rating" },
];

const ModalFilters: FC<FiltersProps> = ({ categories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [categoria, setCategoria] = useState<any>();
  /*const [categoria, setCategoria] = useState<Key | null>();
   const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [categories, setCategories] = useState<Array<Category> >([]); */
  const [minPrice, setMinPrice] = useState<any>("");
  const [maxPrice, setMaxPrice] = useState<any>("");

  const { filters, setFilters, setSortParmas } = useFilterStore();

  const handleOpen = () => {
    onOpen();
  };

  const handleSortChange = async (key: Key) => {
    let newSortOptions: Array<SortOption> = [];
    switch (key) {
      case "masViejo":
        newSortOptions = [{ field: "createdAt", order: "asc" }];
        break;
      case "masNuevo":
        newSortOptions = [{ field: "createdAt", order: "desc" }];
        break;
      case "precioCreciente":
        newSortOptions = [
          { field: "price", order: "asc" },
          { field: "createdAt", order: "asc" },
        ];
        break;
      case "precioDecreciente":
        newSortOptions = [
          { field: "price", order: "desc" },
          { field: "createdAt", order: "asc" },
        ];
        break;
      case "masPopular":
        newSortOptions = [
          { field: "ratingAverage", order: "desc" },
          { field: "createdAt", order: "asc" },
        ];
        break;
      case "menosPopular":
        newSortOptions = [
          { field: "ratingAverage", order: "asc" },
          { field: "createdAt", order: "asc" },
        ];
        break;
      default:
        break;
    }

    setSortParmas(newSortOptions);
  };

  const handleResult = () => {
    setFilters({
      rating: rating,
      category: categoria?.toString(),
      minPrice: parseInt(minPrice),
      maxPrice: parseInt(maxPrice),
    });
    onClose();
  };

  const handleReset = () => {
    setSortParmas([]);
    setFilters({});
    onClose();
  };

  useEffect(() => {
    setMinPrice(`${filters.minPrice}`);
    setMaxPrice(`${filters.maxPrice}`);
    setCategoria(`${filters.category}`);
    //setSelectedColor(new Set([filters.color || "Selecciona un color"]))
  }, [filters]);

  return (
    <>
      <button
        onClick={handleOpen}
        type="button"
        className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
      >
        <svg
          className="-ms-0.5 me-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
          />
        </svg>
        Filtros
        <svg
          className="-me-0.5 ms-2 h-4 w-4"
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
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <div className="left-0 right-0 top-0 z-50 h-modal w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full">
                <div className=" h-full w-full max-w-xl md:h-auto">
                  {/* <!-- Modal content --> */}
                  <div className=" rounded-lg bg-white dark:bg-gray-800">
                    <ModalHeader className="flex flex-col gap-1">
                      <div className="flex items-start justify-between rounded-t p-4 md:p-5">
                        <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
                          Filtros
                        </h3>
                        <button
                          type="button"
                          className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={onClose}
                        >
                          <svg
                            className="h-5 w-5"
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
                              strokeWidth="2"
                              d="M6 18 17.94 6M18 18 6.06 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <div className="px-4 md:px-5">
                        <div className="space-y-4">
                          <div className="flex justify-center items-center ">
                            <div className="grid grid-cols-2 gap-3 w-full">
                              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                {" "}
                                Precio Minimo:{" "}
                              </label>

                              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                {" "}
                                Precio Maximo:{" "}
                              </label>

                              <div className="col-span-2 flex items-center justify-between space-x-2">
                                <Input
                                  placeholder="0.00"
                                  labelPlacement="outside"
                                  color="primary"
                                  value={minPrice}
                                  onValueChange={setMinPrice}
                                  startContent={
                                    <div className="pointer-events-none flex items-center">
                                      <span className="text-default-400 text-small">
                                        $
                                      </span>
                                    </div>
                                  }
                                  endContent={
                                    <div className="flex items-center">
                                      <label
                                        className="sr-only"
                                        htmlFor="currency"
                                      >
                                        Currency
                                      </label>
                                      <select
                                        className="outline-none border-0 bg-transparent text-default-400 text-small"
                                        id="currency"
                                        name="currency"
                                      >
                                        <option>USD</option>
                                        <option>ARS</option>
                                        <option>EUR</option>
                                      </select>
                                    </div>
                                  }
                                  type="number"
                                />

                                <div className="shrink-0 text-sm font-medium dark:text-gray-300">
                                  to
                                </div>

                                <Input
                                  placeholder="2000.00"
                                  labelPlacement="outside"
                                  color="primary"
                                  value={maxPrice}
                                  onValueChange={setMaxPrice}
                                  startContent={
                                    <div className="pointer-events-none flex items-center">
                                      <span className="text-default-400 text-small">
                                        $
                                      </span>
                                    </div>
                                  }
                                  endContent={
                                    <div className="flex items-center">
                                      <label
                                        className="sr-only"
                                        htmlFor="currency"
                                      >
                                        Currency
                                      </label>
                                      <select
                                        className="outline-none border-0 bg-transparent text-default-400 text-small"
                                        id="currency"
                                        name="currency"
                                      >
                                        <option>USD</option>
                                        <option>ARS</option>
                                        <option>EUR</option>
                                      </select>
                                    </div>
                                  }
                                  type="number"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h6 className="mb-2 text-sm font-medium text-black dark:text-white">
                              Categoria:
                            </h6>

                            <Autocomplete
                              label="Seleccionar categoría"
                              className=" w-full"
                              color="primary"
                              defaultSelectedKey={categoria?.toString()}
                              onSelectionChange={setCategoria}
                              size="sm"
                            >
                              {categories.map((categoria) => (
                                <AutocompleteItem
                                  key={categoria.id}
                                  textValue={categoria.name}
                                >
                                  {categoria.name}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete>
                          </div>

                          <div className="grid grid-cols-2 gap-5">
                            <div className="w-full">
                              <h6 className="mb-2 text-sm font-medium text-black dark:text-white">
                                Valoración:
                              </h6>
                              <Rating
                                style={{ maxWidth: 200 }}
                                value={rating}
                                onChange={setRating}
                                itemStyles={{
                                  itemShapes: RoundedStar,
                                  activeFillColor: "#ffb700",
                                  inactiveFillColor: "#fbf1a9",
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <h6 className="mb-2 text-sm font-medium text-black dark:text-white">
                              Ordenar Por:
                            </h6>
                            {/* <RadioGroup
                              size="md"
                              onValueChange={handleSortChange}
                              orientation="vertical"
                            >
                              <Radio value="masPopular">Más Popular</Radio>
                              <Radio value="menosPopular">Menos Popular</Radio>
                              <Radio value="precioCreciente">
                                Precio Creciente
                              </Radio>
                              <Radio value="precioDecreciente">
                                Precio Decreciente
                              </Radio>
                              <Radio value="masNuevo">Más Nuevo</Radio>
                              <Radio value="masViejo">Más Viejo</Radio>
                            </RadioGroup> */}
                            <Autocomplete
                              label="Seleccionar orden"
                              className=" w-full"
                              color="primary"
                              defaultSelectedKey={orders?.toString()}
                              onValueChange={handleSortChange}
                              size="sm"
                            >
                              {orders.map((order) => (
                                <AutocompleteItem
                                  key={order.key}
                                  textValue={order.label}
                                >
                                  {order.label}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <div className="flex items-center space-x-4 rounded-b p-4 dark:border-gray-600 md:p-5">
                        <Button color="primary" onPress={handleResult}>
                          Mostrar Resultados
                        </Button>
                        <button
                          onClick={handleReset}
                          type="reset"
                          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                        >
                          Reiniciar
                        </button>
                      </div>
                    </ModalFooter>
                  </div>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalFilters;
