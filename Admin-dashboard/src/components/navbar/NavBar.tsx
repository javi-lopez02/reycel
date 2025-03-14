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
          <div className="flex lg:w-4/5 items-center">
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
          </div>
          <div className="flex items-center lg:order-2 space-x-2">
            <Notifications />
            <DropdownComp />
            <Avatar  />
          </div>
        </div>
      </nav>
      <Outlet/>
    </>
  );
}

export default NavBar;
