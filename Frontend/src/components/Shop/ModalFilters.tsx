import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Autocomplete, AutocompleteItem, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import { Rating, RoundedStar } from '@smastrom/react-rating'
import type { SharedSelection } from "@nextui-org/react";

import '@smastrom/react-rating/style.css'
import { useProduct } from "../../context/product.context";
import { categoryRequest } from "../../services/product";
import { Category } from "../../types";
import { toast, ToastContainer } from "react-toastify";
import { VscError } from "react-icons/vsc";

function ModalFilters() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(3)
  const [selectedColor, setSelectedColor] = useState<SharedSelection>();
  const [categoria, setCategoria] = useState<Key | null>()
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [categories, setCategories] = useState<Array<Category>>([])
  const [error, setError] = useState<Array<string> | null>(null)

  const { filters, setFilters, setCurrentPage, setIsNextPage, setSortParmas } = useProduct()

  const handleOpen = () => {
    onOpen();
  }

  const handleResult = () => {
    setCurrentPage(1)
    setIsNextPage(true)
    setFilters({ rating: rating.toString(), color: selectedColor?.currentKey, categoriy: categoria?.toString(), minPrice, maxPrice })
    onClose()
  }

  const handleReset = () => {
    setCurrentPage(1)
    setIsNextPage(true)
    setSortParmas([])
    setFilters({})
    onClose()
  }

  useEffect(() => {
    setMinPrice((filters.minPrice) as string)
    setMaxPrice((filters.maxPrice) as string)
    setCategoria(filters.categoriy)
    //setSelectedColor(new Set([filters.color || "Selecciona un color"]))

  }, [filters])

  useEffect(() => {
    categoryRequest()
      .then((res) => {
        setCategories(res.data.data)
      }).catch((error) => {
        console.log(error)
        setError(["Error al cargar las Categorias"])
      })
  }, [])

  return (
    <>
      <button
        onClick={handleOpen}
        type="button"
        className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
      >
        <svg
          className="-ms-0.5 me-2 h-4 w-4"
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

            d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
          />
        </svg>
        Filtros
        <svg
          className="-me-0.5 ms-2 h-4 w-4"
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
                        <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">Filtros</h3>
                        <button
                          type="button"
                          className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={onClose}>
                          <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
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
                              <label className="block text-sm font-medium text-gray-900 dark:text-white"> Precio Minimo </label>

                              <label className="block text-sm font-medium text-gray-900 dark:text-white"> Precio Maximo </label>


                              <div className="col-span-2 flex items-center justify-between space-x-2">
                                <Input
                                  placeholder="0.00"
                                  labelPlacement="outside"
                                  color="primary"
                                  value={minPrice}
                                  onValueChange={setMinPrice}
                                  startContent={
                                    <div className="pointer-events-none flex items-center">
                                      <span className="text-default-400 text-small">$</span>
                                    </div>
                                  }
                                  endContent={
                                    <div className="flex items-center">
                                      <label className="sr-only" htmlFor="currency">
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

                                <div className="shrink-0 text-sm font-medium dark:text-gray-300">to</div>

                                <Input
                                  placeholder="2000.00"
                                  labelPlacement="outside"
                                  color="primary"
                                  value={maxPrice}
                                  onValueChange={setMaxPrice}
                                  startContent={
                                    <div className="pointer-events-none flex items-center">
                                      <span className="text-default-400 text-small">$</span>
                                    </div>
                                  }
                                  endContent={
                                    <div className="flex items-center">
                                      <label className="sr-only" htmlFor="currency">
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
                            <h6 className="mb-2 text-sm font-medium text-black dark:text-white">Categoria</h6>

                            <Autocomplete
                              label="Seleccionar categoría"
                              className=" w-full"
                              color="primary"
                              defaultSelectedKey={categoria?.toString()}
                              onSelectionChange={setCategoria}
                              size="sm"
                            >
                              {categories.map((categoria) => (
                                <AutocompleteItem key={categoria.id} value={categoria.name}>
                                  {categoria.name}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete>
                          </div>

                          <div className="grid grid-cols-2 gap-5">
                            <div className="w-full">
                              <h6 className="mb-2 text-sm font-medium text-black dark:text-white">Rating</h6>
                              <Rating style={{ maxWidth: 200 }} value={rating} onChange={setRating} itemStyles={{
                                itemShapes: RoundedStar,
                                activeFillColor: '#ffb700',
                                inactiveFillColor: '#fbf1a9'
                              }} />
                            </div>
                            <div className="w-full">
                              <h6 className="mb-2 text-sm font-medium text-black dark:text-white ">Color</h6>
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button
                                    variant="bordered"
                                    className="capitalize w-full"
                                  >
                                    {selectedColor && (
                                      selectedColor
                                    )}

                                    {
                                      !selectedColor && (
                                        <h1>Color</h1>
                                      )
                                    }

                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                  aria-label="Single selection example"
                                  variant="flat"
                                  disallowEmptySelection
                                  selectionMode="single"
                                  selectedKeys={selectedColor}
                                  onSelectionChange={setSelectedColor}
                                >
                                  <DropdownItem key="Blanco">Blanco</DropdownItem>
                                  <DropdownItem key="Negro" >Negro</DropdownItem>
                                  <DropdownItem key="Gris" color="default">Gris</DropdownItem>
                                  <DropdownItem key="Rojo" color="danger">Rojo</DropdownItem>
                                  <DropdownItem key="Azul" color="primary">Azul</DropdownItem>
                                  <DropdownItem key="Verde" color="success">Verde</DropdownItem>
                                  <DropdownItem key="Amarillo" color="warning">Amarillo</DropdownItem>

                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <div className="flex items-center space-x-4 rounded-b p-4 dark:border-gray-600 md:p-5">
                        <Button color="primary" onClick={handleResult}>
                          Mostrar Resultados
                        </Button>
                        <button
                          onClick={handleReset}
                          type="reset"
                          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Reiniciar</button>
                      </div>
                    </ModalFooter>
                  </div>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
      {error && error.map((err) => toast(err))}

      <ToastContainer
        theme="light"
        icon={<VscError color="red" />}
        position="bottom-right"
      />
    </>
  )
}

export default ModalFilters