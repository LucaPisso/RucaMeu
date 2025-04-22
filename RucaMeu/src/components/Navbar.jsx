import React from "react";
import "./NavBar.css";
import imagen1 from "../assets/fanal-gris.jpg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={imagen1} alt="" style={{ height: "100px", width: "400px" }} />
      </div>
      <div className="menu">
        <Link to="/">
          <p>Home</p>
        </Link>
        <p>Productos</p>
        <p>Cuenta</p>
        <p>Carrito</p>
      </div>
    </div>
  );
};

export default NavBar;
