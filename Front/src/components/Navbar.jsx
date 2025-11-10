import "./Navbar.css";
import imagen1 from "../assets/products/fanal-gris.jpg";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";

const NavBar = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("RucaMeu-token");

  return (
    <div className="navbar">
      <Link to="/">
        <div className="logo">
          <div style={{ height: "100px", width: "400px" }}> RucaMeu </div>
        </div>
      </Link>
      <div className="menu">
        <Link className="link-navbar" to="/">
          <p>Inicio</p>
        </Link>
        <Link className="link-navbar" to="/products">
          <p>Productos</p>
        </Link>
        {user ? (
          <Link className="link-navbar" to="/updateUser">
            <p>Perfil</p>
          </Link>
        ) : (
          <Link className="link-navbar" to="/register">
            <p>Registrarse</p>
          </Link>
        )}
        <Link className="link-navbar" to="/carrito">
          <p>Carrito</p>
        </Link>
        {user?.role === "admin" && (
          <Link className="link-navbar" to="/adminPanel">
            <p>Admin</p>
          </Link>
        )}
        {user && (
          <button
            onClick={() => Logout({ navigate })}
            className="logout-button"
          >
            Cerrar <br />
            sesión ↩
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
