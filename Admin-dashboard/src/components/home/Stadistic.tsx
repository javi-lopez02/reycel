import { Link } from "react-router-dom";
import useProduct from "../../customHooks/useProduct";
import useUser from "../../customHooks/useUser";

export default function Stadistic() {
  const products = useProduct();
  const user = useUser();

  return (
    <div className="bg-gray-50 flex items-center justify-center font-sans py-10">
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-12 rounded-3xl ">
        <Link to={"/users"}>
          <div className="bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.2)] text-center p-2 rounded-2xl">
            <svg
              className="fill-teal-700 w-10 h-10 inline-block"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 19"
            >
              <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
              <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
            </svg>
            <h3 className="text-3xl font-extrabold text-teal-700 fill-tetext-teal-700 mt-5">
              {user && user.users?.length}
            </h3>
            <p className="text-base font-semibold mt-3">Usuarios Totales</p>
          </div>
        </Link>
        <Link to={"/products"}>
          <div className="bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.2)] text-center p-2 rounded-2xl">
            <svg
              className="fill-teal-700 w-10 h-10 inline-block"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
            </svg>
            <h3 className="text-3xl font-extrabold text-teal-700 fill-tetext-teal-700 mt-5">
              {products && products.products?.length}
            </h3>
            <p className="text-base font-semibold mt-3">Productos Totales</p>
          </div>
        </Link>
        <Link to={"/orders"}>
          <div className="bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.2)] text-center p-2 rounded-2xl">
            <svg
              className="fill-teal-700 w-10 h-10 inline-block"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
            </svg>
            <h3 className="text-3xl font-extrabold text-teal-700 fill-tetext-teal-700 mt-5">
              700+
            </h3>
            <p className="text-base font-semibold mt-3">Ordenes Totales</p>
          </div>
        </Link>
        <Link to={"/payments"}>
          <div className="bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.2)] text-center p-2 rounded-2xl">
            <svg
              className="fill-teal-700 w-10 h-10 inline-block"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
            </svg>
            <h3 className="text-3xl font-extrabold text-teal-700 fill-tetext-teal-700 mt-5">
              450+
            </h3>
            <p className="text-base font-semibold mt-3">Ventas Totales </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
