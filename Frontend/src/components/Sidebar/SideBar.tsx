
import { Link } from "react-router-dom";

function SideBar() {


  return (
    <>
      <ul className="p-4 w-auto">
        <h1 className="font-semibold text-xl">Categorias</h1>
        <li>
          <Link
            to={`/`}
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 hover:dark:bg-neutral-700 rounded-lg transition-all dark:text-slate-300 "
          >
           
            <span className="font-semibold">Accesorios</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/#"}
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-slate-300 hover:dark:bg-neutral-700 dark:focus:bg-neutral-800"
          >
            <span className="font-semibold">Moviles</span>
          </Link>
        </li>

        <li>
          <Link
            to={"/#"}
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-slate-300 hover:dark:bg-neutral-700"
          >
            
            <span className="font-semibold">Relojes</span>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default SideBar;
