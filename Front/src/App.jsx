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

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/login"
          element={<LoginPage setIsLogged={setIsLogged} />}
        />
        <Route path="/addProduct" element={<AddProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
