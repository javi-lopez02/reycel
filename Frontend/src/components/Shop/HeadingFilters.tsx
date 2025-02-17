import { Button } from "@heroui/react"
import { useProduct } from "../../context/product.context"
import ModalFilters from "./ModalFilters"
import ModalSorting from "./ModalSorting"

function HeadingFilters() {
  const { sortParmas, setFilters, setCurrentPage, setIsNextPage, setSortParmas } = useProduct()

  const handleReset = () => {
    setCurrentPage(1)
    setIsNextPage(true)
    setSortParmas([])
    setFilters({})
  }

  return (
    <>
      <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-4">
        <div>
          <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Productos
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <ModalFilters />

          <ModalSorting />
          {/* Modal sorting */}
        </div>

      </div>
      {
        sortParmas.length !== 0 && (
          <div className="mb-5 w-full flex justify-end" >
            <Button onClick={handleReset} >Limpiar Filtros</Button>
          </div>
        )
      }

    </>
  )
}

export default HeadingFilters