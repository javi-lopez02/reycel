import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./pages/Home";
import SideAndNav from "./components/SideAndNav";

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<SideAndNav />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
