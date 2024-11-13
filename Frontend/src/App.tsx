import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Shop from "./pages/Shop";
import Acerca from "./pages/Acerca";
import Contacto from "./pages/Contacto";
import Navbar from "./components/NavBar";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/auth.context";
import CarShop from "./pages/CarShop";
import { ProductProvider } from './context/product.context'

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />}>
              <Route element={<Navbar />}>
                <Route path="/" element={<Shop />} />
                <Route path="/acerca" element={<Acerca />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/shopCar" element={<CarShop />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
