//COMPONENTES
import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import AdminPanel from "./pages/AdminPanel";
import Register from "./components/Register";
import UpdateUser from "./components/UpdateUser";
import CarritoPage from "./pages/CarritoPage";
import Protected from "./components/Protected";
import ProductsPage from "./pages/ProductsPage";
import NotFound from "./components/NotFound";
import UpdateProduct from "./components/UpdateProduct";
import Login from "./components/Login";
import Footer from "./components/Footer";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Toaster />
      <NavBar />
      <Routes>
        {/* Rutas comunes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/updateUser" element={<UpdateUser />} />

        {/* Rutas que debemos proteger */}
        <Route element={<Protected allowedRoles={["admin"]} />}>
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
        </Route>

        <Route element={<Protected />}>
          <Route path="/carrito" element={<CarritoPage />} />
        </Route>
      </Routes>
      <br />
      <br />
    </>
  );
}

export default App;
