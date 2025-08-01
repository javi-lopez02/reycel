import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/navbar/NavBar";
import Login from "../pages/Login";
import User from "../pages/User";
import Home from "../pages/Home";
import Workers from "../pages/Workers";
import WorkersForm from "../components/workers/WorkersForm";
import Sedes from "../pages/Sedes";
import Products from "../pages/Products";
import ProductsForm from "../components/products/ProductsForm";
import Categories from "../pages/Categories";
import CategoriesForm from "../components/categories/CategoriesForm";
import Order from "../pages/Order";
import NewOrderPage from "../components/neworder/NewOrderPage";

// Protected route component
const ProtectedRoute: React.FC<{
  element: React.ReactElement;
  adminOnly?: boolean;
}> = ({ element, adminOnly = false }) => {
  const { isAuth, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Check authentication
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  /* // Check admin access if required
  if (adminOnly) {
    return <Navigate to="/shop" replace />;
  } */

  return element;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Admin Routes */}
      <Route
        path="/"
        element={<ProtectedRoute element={<NavBar />} adminOnly={true} />}
      >
        <Route index element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />

      
        <Route path="users">
          <Route index element={<User />} />
        </Route>

        <Route path="workers">
          <Route index element={<Workers />} />
          <Route path="new" element={<WorkersForm />} />
          <Route path=":id/edit" element={<WorkersForm />} />
        </Route>

        <Route path="products">
          <Route index element={<Products />} />
          <Route path="new" element={<ProductsForm />} />
          <Route path=":id/edit" element={<ProductsForm />} />
        </Route>
 
        <Route path="categories">
          <Route index element={<Categories />} />
          <Route path="new" element={<CategoriesForm />} />
          <Route path=":id/edit" element={<CategoriesForm />} />
        </Route>

        <Route path="order">
          <Route index element={<Order />} />
          <Route path="new" element={<NewOrderPage />} />
        </Route>
{/*
        <Route path="payments">
          <Route index element={<Payments />} />
          <Route path="new" element={<PaymentsForm />} />
          <Route path=":id/edit" element={<PaymentsForm />} />
        </Route>

        */}

        <Route path="sedes">
          <Route index element={<Sedes />} />
          {/* <Route path="new" element={<SedesForm />} />
          <Route path=":id/edit" element={<SedesForm />} /> */}
        </Route>

      {/*   <Route path="trash">
          <Route index element={<Investments />} />
          <Route path="new" element={<InvestmentsForm />} />
          <Route path=":id/edit" element={<InvestmentsForm />} />
        </Route> 
 */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
