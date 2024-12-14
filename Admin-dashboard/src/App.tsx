import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./pages/Home";
import NavBar from "./components/navbar/NavBar";
import User from "./pages/User";
import Products from "./pages/Products";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<NavBar />}>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/product" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route element={<NavBar />}>
                <Route path="/" element={<Home />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider> */}
    </NextUIProvider>
  );
}

export default App;
