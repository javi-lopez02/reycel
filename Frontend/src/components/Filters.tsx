import { Checkbox, CheckboxGroup, Input, ScrollShadow } from "@heroui/react";
import { Rating, RoundedStar } from "@smastrom/react-rating";

function Filters() {
  return (
    <div className="h-full py-3 bg-slate-100 w-64 px-3 fixed lg:inline-block hidden">
      <ScrollShadow hideScrollBar size={1} className="h-screen pb-16">
        <div className="flex flex-col gap-4">
          <CheckboxGroup
            color="primary"
            size="sm"
            label="Filtros"
            /* value={selected}
              onValueChange={setSelected} */
          >
            <Checkbox value="buenos-aires">Más Popular</Checkbox>
            <Checkbox value="sydney">Menos Popular</Checkbox>
            <Checkbox value="san-francisco">Precio Creciente</Checkbox>
            <Checkbox value="san-francisco">Precio Decreciente</Checkbox>
            <Checkbox value="san-francisco">Más Nuevo</Checkbox>
            <Checkbox value="san-francisco">Más Viejo</Checkbox>
          </CheckboxGroup>
          <div className="grid grid-cols-2 gap-3 w-full">
            <label className="block text-sm text-neutral-400 dark:text-white">
              Precio
            </label>

            <div className="col-span-2 flex items-center justify-between space-x-2">
              <Input
                placeholder="0"
                labelPlacement="outside"
                color="primary"
                /* value={minPrice}
              onValueChange={setMinPrice} */
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                type="number"
              />

              <div className="shrink-0 text-sm font-medium dark:text-gray-300">
                to
              </div>

              <Input
                placeholder="2000"
                labelPlacement="outside"
                color="primary"
                /* value={maxPrice}
              onValueChange={setMaxPrice} */
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                type="number"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="w-full">
              <h6 className="mb-2 text-sm font-medium text-neutral-400 dark:text-white">
                Rating
              </h6>
              <Rating
                style={{ maxWidth: 500 }}
                value={3}
                /*onChange={setRating} */
                itemStyles={{
                  itemShapes: RoundedStar,
                  activeFillColor: "#ffb700",
                  inactiveFillColor: "#fbf1a9",
                }}
              />
            </div>
          </div>

          <CheckboxGroup
            color="primary"
            size="sm"
            label="Categorías"
            /* value={selected}
              onValueChange={setSelected} */
          >
            <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
            <Checkbox value="sydney">Sydney</Checkbox>
            <Checkbox value="san-francisco">San Francisco</Checkbox>
            <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
            <Checkbox value="sydney">Sydney</Checkbox>
            <Checkbox value="san-francisco">San Francisco</Checkbox>
            <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
            <Checkbox value="sydney">Sydney</Checkbox>
            <Checkbox value="san-francisco">San Francisco</Checkbox>
            <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
            <Checkbox value="sydney">Sydney</Checkbox>
            <Checkbox value="san-francisco">San Francisco</Checkbox>
            <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
            <Checkbox value="sydney">Sydney</Checkbox>
            <Checkbox value="san-francisco">San Francisco</Checkbox>
            <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
            <Checkbox value="sydney">Sydney</Checkbox>
            <Checkbox value="san-francisco">San Francisco</Checkbox>
            <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
            <Checkbox value="sydney">Sydney</Checkbox>
            <Checkbox value="san-francisco">San Francisco</Checkbox>
            <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
            <Checkbox value="sydney">Sydney</Checkbox>
            <Checkbox value="san-francisco">Ultima</Checkbox>
          </CheckboxGroup>
        </div>
      </ScrollShadow>
    </div>
  );
}

export default Filters;
