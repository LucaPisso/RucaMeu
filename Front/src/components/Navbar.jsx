import "./Navbar.css";
import imagen1 from "../assets/products/fanal-gris.jpg";
import { Link } from "react-router-dom";

const NavBar = () => {
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) user = JSON.parse(storedUser);
  } catch (e) {
    console.error("Error al parsear el usuario desde localStorage:", e);
    localStorage.removeItem("user");
  }

  return (
    <div className="navbar">
      <div className="logo">
        <img src={imagen1} alt="" style={{ height: "100px", width: "400px" }} />
      </div>
      <div className="menu">
        <Link className="link-navbar" to="/">
          <p>Home</p>
        </Link>
        <Link className="link-navbar" to="/products">
          <p>Products</p>
        </Link>
        <Link className="link-navbar" to="/register">
          <p>Cuenta</p>
        </Link>
        <Link className="link-navbar" to="/">
          <p>Carrito</p>
        </Link>
        {user?.role === "admin" && (
          <Link className="link-navbar" to="/adminPanel">
            <p>Admin</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
