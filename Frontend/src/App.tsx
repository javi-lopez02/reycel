import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/NavBar/NavBar";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/auth.context";
import CarShop from "./pages/CarShop";
import { HeroUIProvider } from "@heroui/react";
import Details from "./pages/Details";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Page404 from "./pages/404Page";
import VerifyUser from "./pages/auth/VerifyUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()

function App() {
  const ProductProviderOutlet = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    );
  };

  return (
    <HeroUIProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster richColors expand={true} />
          <Routes>
            <Route path="/verifyUser" element={<VerifyUser />} />
            <Route path="/*" element={<Page404 />} />

            <Route element={<ProductProviderOutlet />}>
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
    </HeroUIProvider>
  );
}

export default App;
