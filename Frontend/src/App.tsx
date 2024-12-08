import { BrowserRouter, Routes, Route, Outlet, } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/NavBar/NavBar";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/auth.context";
import CarShop from "./pages/CarShop";
import { ProductProvider } from './context/product.context'
import { NextUIProvider } from "@nextui-org/react";
import Details from "./pages/Details";
import Home from "./pages/Home";
import { Toaster } from "sonner";

function App() {
  const ProductProviderOutlet = () => {
    return (
      <ProductProvider>
        <Outlet />
      </ProductProvider>
    )
  }

  return (
    <NextUIProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster richColors expand={true}/>
          <Routes >
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={< ProductProviderOutlet />}>
              <Route element={<Navbar />}>
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/contactUs" element={<ContactUs />} />
                <Route path="/" element={<Home />} />
                <Route path="/details" element={<Details />} />

                <Route element={<ProtectedRoutes />}>
                  <Route path="/shopCar" element={<CarShop />} />
                </Route>

              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </NextUIProvider >
  );
}

export default App;
