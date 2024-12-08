import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import SideBar from "./SideBar"

function SideAndNav() {
  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <SideBar />
      </div>
      <Outlet/>
    </>
  )
}

export default SideAndNav