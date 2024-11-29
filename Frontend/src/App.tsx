import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/NavBar";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/auth.context";
import CarShop from "./pages/CarShop";
import { ProductProvider } from './context/product.context'
import { NextUIProvider } from "@nextui-org/react";
import Details from "./pages/Details";
import Shop from "./pages/Shop";

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>

            <Routes >
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<Navbar />}>
                <Route element={<ProtectedRoutes />}>
                  <Route path="/aboutUs" element={<AboutUs />} />
                  <Route path="/contactUs" element={<ContactUs />} />
                  <Route path="/shopCar" element={<CarShop />} />

                  <Route path="/" element={<Shop />} />
                  <Route path="/details" element={<Details />} />
                </Route>
              </Route>
            </Routes>

          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </NextUIProvider >
  );
}

export default App;
