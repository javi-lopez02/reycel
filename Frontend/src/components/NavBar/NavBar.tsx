import { useRef } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { MdMenuOpen, MdLogout } from "react-icons/md";
import { useAuth } from "../../context/auth.context";
import { useProduct } from "../../context/product.context";
import { useDebouncedCallback } from "use-debounce";
//import ModalLogin from "../../pages/auth/ModalLogin";
import { useDisclosure } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import AuthUser from "../../pages/auth/AuthUser";

const Navbar = () => {
  const { setCurrentPage, setQuerySeach, setIsNextPage, setErrorSearch } =
    useProduct();
  const { logout, isAuth } = useAuth();

  const navigate = useNavigate();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleClick = (key: string | number | undefined) => {
    if (key === "Logout") {
      logout();
    } else if (key === "Registro") {
      onOpen();
    } else {
      navigate(`/${key}`);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const debounced = useDebouncedCallback((value: string) => {
    setQuerySeach(value);
  }, 500);

  const handleSearch = () => {
    if (inputRef.current) {
      const newSearch = inputRef.current.value.trim();
      if (newSearch.length <= 2 && newSearch !== "") {
        setErrorSearch(["La busqueda debe tener más de 3 caracteres"]);
        return;
      }
      setErrorSearch(null);
      setCurrentPage(1);
      setIsNextPage(true);
      debounced(newSearch);
    }
  };

  return (
    <>
      <nav className="bg-white dark:bg-zinc-800 pl-3 h-14 w-full shadow flex flex-row items-center justify-between fixed top-0 z-50 border-b dark:border-neutral-700">
        <div className="flex items-center space-x-3 md:w-60">
          <Link to="/" className="flex items-center">
            <img src="./Logo.jpeg" alt="logo" className="min-w-12 md:w-8 h-8" />
            <h1 className="hidden md:inline text-xl ml-2 sm:text-2xl font-bold">
              REYCEL
            </h1>
          </Link>
        </div>

        <div className="flex justify-between items-center space-x-4 w-full ml-5 mr-2">
          <input
            type="text"
            ref={inputRef}
            placeholder="Buscar..."
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute h-5 w-5 text-gray-800" >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
              <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
            </svg>
          </div>

          {/* <FaSearch className="absolute h-5 w-5 text-gray-800" /> */}
        </div>

        <div className="hidden lg:flex justify-end items-center space-x-1 w-6/12">
          <div className="hidden lg:flex font-semibold text-lg pr-6">
            <ul className="flex items-center space-x-4">
              <li className="p-1 s border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                <Link to="/">Tienda</Link>
              </li>
              <li className="p-1  border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                <Link to="/aboutUs">Sedes</Link>
              </li>
              <li className="p-1 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                <Link to="/contactUs">Contactanos</Link>
              </li>
            </ul>
          </div>

          <div className="flex w-auto gap-1">
            {isAuth && (
              <div className="hidden lg:flex font-semibold text-lg">
                <Link
                  to="/shopCar"
                  className="sm:p-3 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer"
                >
                  <TiShoppingCart className="min-h-6 min-w-6" />
                </Link>
              </div>
            )}
            <div className="hidden lg:flex lg:items-center font-semibold text-lg">
              {isAuth && (
                <div
                  onClick={logout}
                  className="sm:p-3 border-b-2 border-red-500 border-opacity-0 hover:border-opacity-100 hover:text-red-500 duration-200 cursor-pointer"
                >
                  <MdLogout className="min-h-6 min-w-6" />
                </div>
              )}
              {!isAuth && (
                <button
                  onClick={onOpen}
                  className="mr-5 ml-5 px-3 rounded-md bg-blue-600 text-white font-bold"
                >
                  {" "}
                  Registrate
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Boton Menu */}
        <div className="lg:hidden flex items-center">
          <ul className="mr-2">
            <li className="p-2 text-gray-900 rounded-lg outline-none hover:text-blue-500">
              <Link to="/shopCar">
                <TiShoppingCart className="min-h-6 min-w-6" />
              </Link>
            </li>
          </ul>
          <ul className="mr-2">
            <li className="p-2 text-gray-900 rounded-lg outline-none hover:text-blue-500">
              {isAuth && (
                <Dropdown>
                  <DropdownTrigger>
                    <button className="flex items-center justify-center w-8 h-8 hover:text-primary">
                      <MdMenuOpen className="min-w-7 h-7" />
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu
                    // color="primary"
                    variant="shadow"
                    aria-label="Action event example"
                    onAction={(key) => handleClick(key)}
                  >
                    <DropdownItem key="">Tienda</DropdownItem>
                    <DropdownItem key="aboutUs">Sedes</DropdownItem>
                    <DropdownItem key="contactUs">Contacto</DropdownItem>
                    <DropdownItem
                      key="Logout"
                      className="text-danger"
                      color="danger"
                    >
                      Cerrar Sesion
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}

              {!isAuth && (
                <Dropdown>
                  <DropdownTrigger>
                    <button className="flex items-center justify-center w-8 h-8 hover:text-primary">
                      <MdMenuOpen className="min-w-7 h-7" />
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu
                    // color="primary"
                    variant="shadow"
                    aria-label="Action event example"
                    onAction={(key) => handleClick(key)}
                  >
                    <DropdownItem key="">Tienda</DropdownItem>
                    <DropdownItem key="aboutUs">Sedes</DropdownItem>
                    <DropdownItem key="contactUs">Contacto</DropdownItem>
                    <DropdownItem
                      key="Registro"
                      variant="solid"
                      className="text-primary"
                      color="primary"
                    >
                      Registrate
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </li>
          </ul>
        </div>
        <AuthUser isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}/>
        {/* <ModalLogin isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}></ModalLogin> */}
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;
