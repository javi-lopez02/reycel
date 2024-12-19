import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./pages/Home";
import NavBar from "./components/navbar/NavBar";
import User from "./pages/User";
import Products from "./pages/Products";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Toaster } from "sonner";
import Categories from "./pages/Categories";
import Payments from "./pages/Payments";

function App() {
  return (
    <AuthProvider>
      <NextUIProvider>
        <Toaster richColors expand={true} />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route element={<NavBar />}>
                <Route path="/" element={<Home/>} />
                <Route path="/users" element={<User />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/payments" element={<Payments />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </AuthProvider>
  );
}

export default App;
