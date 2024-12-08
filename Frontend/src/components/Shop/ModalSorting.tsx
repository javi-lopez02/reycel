import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { Key } from "react";
import { SortOption } from "../../types";
import { useProduct } from "../../context/product.context";

function ModalSorting() {

  const {setSortParmas, setCurrentPage, setIsNextPage } = useProduct()

  const handleSortChange = async (key: Key) => {
    let newSortOptions : Array<SortOption> = [];
    switch (key) {
      case "masViejo":
        newSortOptions = [{ field: "createdAt", order: "asc" }];
        break;
      case "masNuevo":
        newSortOptions = [{ field: "createdAt", order: "desc" }];
        break;
      case "precioCreciente":
        newSortOptions = [{ field: "price", order: "asc" },{ field: "createdAt", order: "asc" }];
        break;
      case "precioDecreciente":
        newSortOptions = [{ field: "price", order: "desc" },{ field: "createdAt", order: "asc" }];
        break;
      case "masPopular":
        newSortOptions = [{ field: "ratingAverage", order: "desc" },{ field: "createdAt", order: "asc" }];
        break;
      case "menosPopular":
        newSortOptions = [{ field: "ratingAverage", order: "asc" },{ field: "createdAt", order: "asc" }];
        break;
      default:
        break;
    }
    setCurrentPage(1)
    setIsNextPage(true)
    setSortParmas(newSortOptions)
  };

  return (
    
    <Dropdown backdrop="blur">
      <DropdownTrigger>
      <button
          id="sortDropdownButton1"
          data-dropdown-toggle="dropdownSort1"
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
              strokeLinejoin="round"

              d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4"
            />
          </svg>
          Sort
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
      </DropdownTrigger>
      <DropdownMenu onAction={handleSortChange} variant="faded" aria-label="Static Actions">
        <DropdownItem key="masPopular">Más popular</DropdownItem>
        <DropdownItem key="menosPopular">Menos Popular</DropdownItem>
        <DropdownItem key="precioCreciente">Precio Creciente</DropdownItem>
        <DropdownItem key="precioDecreciente">Precio Decreciente</DropdownItem>
        <DropdownItem key="masNuevo">Más Nuevo</DropdownItem>
        <DropdownItem key="masViejo">Más Viejo</DropdownItem>

      </DropdownMenu>
    </Dropdown>  )
}

export default ModalSorting