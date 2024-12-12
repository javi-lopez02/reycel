import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import {NextUIProvider} from "@nextui-org/react";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <NextUIProvider>
      <AuthProvider>
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
      </AuthProvider>
    </NextUIProvider>
  )
}

export default App;
