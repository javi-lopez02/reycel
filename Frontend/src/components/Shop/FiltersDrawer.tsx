import {
  Drawer,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  ScrollShadow,
  RadioGroup,
  Radio,
  Slider,
  CheckboxGroup,
  Checkbox,
} from "@heroui/react";
import { Category, SortOption } from "../../types";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { TbReload } from "react-icons/tb";
import { useFilterStore } from "../../store/useFilterStore";
import { Rating, RoundedStar } from "@smastrom/react-rating";

interface FiltersProps {
  categories: Category[];
}

export default function FiltersDrawer({ categories }: FiltersProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [rangePrice, setRangePrice] = useState<number[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>();

  const { sortParmas, setSortParmas, setFilters } = useFilterStore();

  const debounced = useDebouncedCallback((value: number[]) => {
    setRangePrice(value);
    onClose();
  }, 800);

  useEffect(() => {
    setFilters({
      rating: rating,
      category: selectCategories,
      minPrice: rangePrice[0],
      maxPrice: rangePrice[1],
    });
  }, [rating, rangePrice, selectCategories, setFilters]); //revisar dependencias

  const handleReset = () => {
    setSelectedValue("");
    setRating(0);
    setSortParmas([]);
    setFilters({});
  };

  const handleSortChange = async (key: string) => {
    let newSortOptions: Array<SortOption> = [];
    setSelectedValue(key);
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
    onClose();
  };

  return (
    <>
      <button
        onClick={onOpen}
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
      <Drawer
        isOpen={isOpen}
        size="xs"
        placement="left"
        backdrop="transparent"
        onClose={onClose}
        hideCloseButton
      >
        <DrawerContent className="dark:bg-gray-800 bg-white lg:mt-1">
          {() => (
            <>
              <DrawerBody>
                <div className="h-full py-3 w-72 px-3 fixed inline-block">
                  <ScrollShadow
                    hideScrollBar
                    size={1}
                    className="h-screen pb-16"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <h6 className="text-base font-semibold text-neutral-500 dark:text-white">
                          Filtros
                        </h6>
                        {sortParmas.length !== 0 && (
                          <button
                            onClick={handleReset}
                            className="size-6 rounded-md bg-slate-200 hover:bg-slate-300 transition flex items-center justify-center text-neutral-800"
                          >
                            <TbReload />
                          </button>
                        )}
                      </div>
                      <RadioGroup
                        size="sm"
                        onValueChange={handleSortChange}
                        value={selectedValue}
                      >
                        <Radio value="masPopular">Más Popular</Radio>
                        <Radio value="menosPopular">Menos Popular</Radio>
                        <Radio value="precioCreciente">Precio Creciente</Radio>
                        <Radio value="precioDecreciente">
                          Precio Decreciente
                        </Radio>
                        <Radio value="masNuevo">Más Nuevo</Radio>
                        <Radio value="masViejo">Más Viejo</Radio>
                      </RadioGroup>

                      <Slider
                        className="max-w-md px-1 pt-3"
                        defaultValue={[0, 1800]}
                        onChange={(value) => debounced(value as number[])}
                        formatOptions={{ style: "currency", currency: "USD" }}
                        label={
                          <h6 className="mb-2 text-base font-medium text-neutral-500 dark:text-white">
                            Precio
                          </h6>
                        }
                        maxValue={2000}
                        minValue={0}
                        step={100}
                      />

                      <div className="grid grid-cols-2 gap-5 pt-3">
                        <div className="w-full">
                          <h6 className="mb-2 text-base font-medium text-neutral-500 dark:text-white">
                            Rating
                          </h6>
                          <Rating
                            style={{ maxWidth: 50 }}
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

                      <CheckboxGroup
                        className="pt-3"
                        color="primary"
                        size="sm"
                        label="Categorías"
                        onValueChange={setSelectCategories}
                      >
                        {categories.map((categori) => (
                          <Checkbox key={categori.id} value={categori.id}>
                            {categori.name}
                          </Checkbox>
                        ))}
                      </CheckboxGroup>
                    </div>
                  </ScrollShadow>
                </div>
              </DrawerBody>
              {/*<DrawerFooter>
                
                </DrawerFooter> */}
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
