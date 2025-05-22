//COMPONENTES
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import AddProductPage from "./pages/AddProductPage";
import "./App.css";

//HOOKS
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Protected from "./components/Protected";
import ProductsPage from "./pages/ProductsPage";

function App() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    role: "",
  });

  return (
    <>
      <NavBar />
      <Routes>
        {/* Rutas comunes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route element={<Protected user={user} allowedRoles={["user"]} />}>
          <Route path="/products" element={<ProductsPage />} />

          {/* Rutas sólo user */}
        </Route>
        <Route element={<Protected user={user} allowedRoles={["admin"]} />}>
          {/* Rutas sólo admin */}
          <Route path="/addProduct" element={<AddProductPage />} />
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
