import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import LogoutIcon from "./icons/LogOutIcon";

const NavBar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("RucaMeu-token");
  const userRole = localStorage.getItem("user_role");

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
        {token ? (
          userRole !== "Client" ? (
            <Link className="link-navbar" to="/updateEmployeeAdmin">
              <p>Perfil</p>
            </Link>
          ) : (
            <Link className="link-navbar" to="/updateClient">
              <p>Perfil</p>
            </Link>
          )
        ) : (
          <Link className="link-navbar" to="/register">
            <p>Registrarse</p>
          </Link>
        )}
        {(userRole === "Client" || userRole === null) && (
          <Link className="link-navbar" to="/carrito">
            <p>Carrito</p>
          </Link>
        )}
        {(userRole === "Admin" || userRole === "Employee") && (
          <Link className="link-navbar" to="/adminPanel">
            <p>Admin</p>
          </Link>
        )}
        {token && (
          <button
            onClick={() => Logout({ navigate })}
            className="logout-button"
          >
            <LogoutIcon className="logout-icon" width="35px" height="35px" />
            {/* <span className="logout-text">Cerrar sesión</span> */}
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
