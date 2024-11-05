import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header className="header sticky top-0 bg-white shadow-md flex justify-between items-center px-4 py-2 sm:px-8 sm:py-4">
        <h1 className="flex items-center space-x-3">
          <Link to="/" className="flex items-center">
            <img
              src="https://img.icons8.com/ios-filled/50/fairytale.png"
              alt="logo"
              className="w-8 h-8"
            />
            <span className="text-xl ml-2 sm:text-2xl font-body">Reycel</span>
          </Link>
        </h1>
        <div className="relative flex justify-end items-center space-x-4 w-3/12">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
              />
            </svg>
          </div>
          <Link to="/" className="relative">
            <svg
              className="h-8 p-1 text-gray-700 duration-200"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="shopping-cart"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
              />
            </svg>
          </Link>
        </div>
        <nav className="hidden lg:flex font-semibold text-lg space-x-6">
          <ul className="flex items-center space-x-4">
            <li className="p-2 sm:p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="p-2 sm:p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <Link to="/productos">Productos</Link>
            </li>
            <li className="p-2 sm:p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <Link to="/acerca">Acerca de</Link>
            </li>
            <li className="p-2 sm:p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <Link to="/contacto">Contáctanos</Link>
            </li>
          </ul>
        </nav>
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-700 rounded-lg outline-none focus:border focus:border-gray-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        {/* <!-- Mobile Menu --> */}
        {isOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-20">
            <nav className="flex flex-col items-center">
              <Link
                to="/home"
                className="block p-4 text-gray-700 hover:text-green-500"
              >
                Home
              </Link>
              <Link
                to="/productos"
                className="block p-4 text-gray-700 hover:text-green-500"
              >
                Productos
              </Link>
              <Link
                to="/acerca"
                className="block p-4 text-gray-700 hover:text-green-500"
              >
                Acerca de
              </Link>
              <Link
                to="/contacto"
                className="block p-4 text-gray-700 hover:text-green-500"
              >
                Contáctanos
              </Link>
            </nav>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
};
export default Navbar;
