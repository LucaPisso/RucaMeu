import React from "react";
import "./Navbar.css";
import imagen1 from "../assets/fanal-gris.jpg";
import { Link } from "react-router-dom";

const NavBar = () => {
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
      </div>
    </div>
  );
};

export default NavBar;
