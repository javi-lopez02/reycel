import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./pages/Home";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<NavBar />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
