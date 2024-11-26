import ModalFilters from "./ModalFilters"
import ModalSorting from "./ModalSorting"

function HeadingFilters() {
  return (
    <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
      <div>
        <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Productos
        </h2>
      </div>
      <div className="flex items-center space-x-4">

        <ModalFilters />


        <ModalSorting/>
        
        {/* Modal sorting */}
      </div>
    </div>
  )
}

export default HeadingFilters