//COMPONENTES
import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import AddProduct from "./components/AddProduct";
import AdminPanel from "./pages/AdminPanel";
import Register from "./components/Register";
import UpdateUser from "./components/UpdateUser";
import CarritoPage from "./pages/CarritoPage";
import Protected from "./components/Protected";
import ProductsPage from "./pages/ProductsPage";
import NotFound from "./components/NotFound";
import UpdateProduct from "./components/UpdateProduct";

import "./App.css";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Rutas comunes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="*" element={<NotFound />} />

        {/* Rutas que debemos proteger */}
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/updateUser/:id" element={<UpdateUser />} />

        {/* <Route element={<Protected allowedRoles={["user", "admin"]} />}> */}
        {/* Rutas sólo user */}
        {/* </Route> */}
        {/* Rutas sólo admin */}
        {/* <Route
          path="/addProduct"
          element={
            <Protected allowedRoles={["admin"]}>
              <AddProduct />
            </Protected>
          }
        /> */}
        {/* <Route
          path="/adminPanel"
          element={
            <Protected allowedRoles={["admin"]}>
              <AdminPanel />
            </Protected>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
