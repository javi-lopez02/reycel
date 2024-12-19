import { Link, Outlet } from "react-router-dom";
import Notifications from "./Notifications";
import DropdownComp from "./DropdownMenu";
import SideBar from "./DrawerSideBar";
import Avatar from "./Avatar";

function NavBar() {
  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-between lg:w-4/5 items-center">
            <SideBar />
            <Link to={"/"} className="flex mr-4">
              <img src="logo.webp" className="mr-3 h-8" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white max-md:hidden">
                Admin Panel
              </span>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white md:hidden">
                Admin
              </span>
            </Link>
            <form className="hidden lg:flex ml-4 lg:w-4/5 lg:pl-2">
              <div className="relative lg:min-w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    {" "}
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />{" "}
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="topbar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block min-w-full pl-9 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center lg:order-2 space-x-2">
            <Notifications />
            <DropdownComp />
            <Avatar image="" user="test" email="test@gmail.com" />
          </div>
        </div>
      </nav>
      <Outlet/>
    </>
  );
}

export default NavBar;
