import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Acerca from "./pages/Acerca";
import Contacto from "./pages/Contacto";
import Card from "./components/Card";
import Navbar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Navbar />}>
          <Route
            path="/card"
            element={
              <Card
                image="https://via.placeholder.com/400"
                title="Celular Ejemplo"
                price="$299.99"
                rating={4}
                reviews={123}
              />
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
