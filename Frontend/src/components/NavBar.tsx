import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDensityMedium } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header className="header sticky top-0 bg-white shadow-md py-4 flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <img
            src="/public/logo.png"
            alt="logo"
            className="w-10 h-10 lg:w-28 lg:h-24"
          />
        </Link>
        <div className="flex flex-col w-full justify-between">
          <div className="flex items-center justify-around">
            <div className="flex items-center">
              <input
                className="ml-2 pl-8 pr-7 py-1 lg:pl-10 lg:pr-9 lg:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="search"
                name=""
                id=""
              />
              <FaSearch className="absolute ml-4 h-6 w-6 text-gray-800" />
            </div>
            <div className="flex">
              <Link to={"/shopCar"}>
                <FaShoppingCart className="h-6 w-6 m-2 hover:text-blue-500" />
              </Link>
              <Link className="hidden lg:flex" to={""}>
                <IoLogOut className="h-6 w-6 m-2 hover:text-blue-500" />
              </Link>
              <MdDensityMedium onClick={toggleMenu} className="lg:hidden flex h-6 w-6 m-2 hover:text-blue-500"/>
              <Link to="/" className="flex items-center">
                <img
                  src="https://via.placeholder.com/400"
                  alt="logo"
                  className="mx-2 w-10 h-10"
                />
              </Link>
            </div>
          </div>
          <nav className="hidden lg:flex lg:w-full lg:items-center lg:justify-center lg:mt-2 lg:font-semibold lg:text-lg">
            <ul className="flex mx-auto items-center justify-center space-x-4">
              <li className="px-2 py-1 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                <Link to="/">Shop</Link>
              </li>
              <li className="px-2 py-1 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                <Link to="/acerca">About Us</Link>
              </li>
              <li className="px-2 py-1 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                <Link to="/contacto">Contact Us</Link>
              </li>
            </ul>
          </nav>
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
              <Link
                to="/login"
                className="block p-2 text-gray-700 hover:text-blue-500"
              >
                Log Out
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
