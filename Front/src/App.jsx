//COMPONENTES
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import AddProduct from "./components/AddProduct";
import AdminPanel from "./pages/AdminPanel";
import CarritoPage from "./pages/CarritoPage";
import "./App.css";

//HOOKS
import { Routes, Route } from "react-router-dom";
import Protected from "./components/Protected";
import ProductsPage from "./pages/ProductsPage";
import NotFound from "./components/NotFound";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Rutas comunes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/carrito" element={<CarritoPage />} />

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
