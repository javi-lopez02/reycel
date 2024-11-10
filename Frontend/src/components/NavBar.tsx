import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDensityMedium } from "react-icons/md";
import { useAuth } from "../context/auth.context";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header className="header sticky top-0 bg-white shadow-md py-2 flex justify-between items-center px-4 sm:px-4 sm:py-2">
        <div className="flex items-center space-x-3 w-60">
          <Link to="/" className="flex items-center">
            <img
              src="https://img.icons8.com/ios-filled/50/fairytale.png"
              alt="logo"
              className="w-8 h-8"
            />
            <h1 className="text-xl ml-2 sm:text-2xl font-bold">REYCEL</h1>
          </Link>
        </div>

        <div className="flex justify-between items-center space-x-4 w-full mx-10">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute h-5 w-5 text-gray-800" />
        </div>

        <div className="hidden lg:flex justify-end items-center space-x-1 w-6/12">
          <div className="hidden lg:flex font-semibold text-lg pr-6">
            <ul className="flex items-center space-x-4">
              <li className="p-1 s border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                <Link to="/">Shop</Link>
              </li>
              <li className="p-1  border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                <Link to="/acerca">About</Link>
              </li>
              <li className="p-1 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                <Link to="/contacto">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="flex w-auto">
            <div className="hidden lg:flex font-semibold text-lg">
              <ul className="mx-1">
                <li className="sm:p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                  <Link to="/shopCar">
                    <FaShoppingCart />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="hidden lg:flex font-semibold text-lg">
              <ul className="mx-1">
                <li className="sm:p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                  <div onClick={logout}>
                    <IoLogOut />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-white shadow-md z-20">
            <nav className="flex flex-col items-center">
              <Link
                to="/"
                className="block p-2 text-gray-700 hover:text-blue-500"
              >
                Shop
              </Link>
              <Link
                to="/acerca"
                className="block p-2 text-gray-700 hover:text-blue-500"
              >
                About Us
              </Link>
              <Link
                to="/contacto"
                className="block p-2 text-gray-700 hover:text-blue-500"
              >
                Contact Us
              </Link>
              <button
                onClick={logout}
                className="block p-2 text-gray-700 hover:text-blue-500"
              >
                Log Out
              </button>
            </nav>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
};
export default Navbar;
