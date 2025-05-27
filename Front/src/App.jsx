//COMPONENTES
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import AddProductPage from "./pages/AddProductPage";
import AdminPanel from "./pages/AdminPanel";
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

        <Route element={<Protected allowedRoles={["user", "admin"]} />}>
          {/* Rutas sólo user */}
        </Route>
        <Route element={<Protected allowedRoles={["admin"]} />}>
          {/* Rutas sólo admin */}
          <Route path="/addProduct" element={<AddProductPage />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
        </Route>
      </Routes>

      {/* <BrowserRouter>
        //{" "}
        <Routes>
          //{" "}
          <Route element={<MainLayout />}>
            //{" "}
            <Route element={<Protected isLogged={isLogged} />}>
              // <Route path="/libros/*" element={<Dashboard />} />
              //{" "}
            </Route>
            //{" "}
          </Route>
          //{" "}
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
          // <Route path="/register" element={<Register></Register>} />
          // <Route path="*" element={<NotFound />} />
          //{" "}
        </Routes>
        //{" "}
      </BrowserRouter> */}
    </>
  );
}

export default App;
