
import { FC } from "react";
import { type Products } from '../../types'
import { Link } from "react-router-dom";

const Card: FC<Products> = (product) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm ">
      <div className="h-56 w-full">
        <Link to={`/details?p=${product.id}`}>
          <img
            className="mx-auto h-full"
            src={product.imagen}
            alt={product.name}
          />
        </Link>
      </div>
      <div className="pt-6">
        <div className=" flex items-center justify-between gap-4">
          {
            product.inventoryCount !== 0 && (
              <span className="me-2 rounded bg-emerald-300 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
                {" "}
                En Stock{" "}
              </span>
            )

          }
          {
            product.inventoryCount === 0 && (
              <span className="me-2 rounded bg-red-400 px-2.5 py-0.5 text-xs font-medium text-zinc-100">
                {" "}
                No hay uniddades{" "}
              </span>
            )
          }

          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              data-tooltip-target="tooltip-quick-look"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only"> Quick look </span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"

                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"

                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
            <div
              id="tooltip-quick-look"
              role="tooltip"
              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              data-popper-placement="top"
            >
              Quick look
              <div className="tooltip-arrow" data-popper-arrow=""></div>
            </div>

            <button
              type="button"
              data-tooltip-target="tooltip-add-to-favorites"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only"> Add to Favorites </span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"

                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                />
              </svg>
            </button>
            <div
              id="tooltip-add-to-favorites"
              role="tooltip"
              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              data-popper-placement="top"
            >
              Add to favorites
              <div className="tooltip-arrow" data-popper-arrow=""></div>
            </div>
          </div>
        </div>

        <div className="w-full h-8 flex items-center">
          {
            product.inventoryCount <= 4 && product.inventoryCount !== 0 && (
              <span className="me-2 py-3 text-sm font-medium text-red-400">
                {`Queda(n) ${product.inventoryCount}, más unidades en camino.`}
              </span>

            )
          }
        </div>
        <Link
          to={`/details?p=${product.id}`}
          className="text-lg overflow-hidden font-semibold leading-tight text-gray-900 hover:underline line-clamp-2"
        >
          {`${product.name},  Ram ${product.ram}GB, Almacenamiento ${product.storage}GB `}
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`h-5 w-5 fill-current ${product.rating > index ? "text-yellow-500" : "text-gray-300"
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.122-6.545L.368 6.91l6.564-.955L10 0l3.068 5.955 6.564.955-4.878 4.635 1.122 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 ml-2">{product.rating} de 5</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
            ${product.price}
          </p>

          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              className="-ms-2 me-2 h-5 w-5"
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
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card