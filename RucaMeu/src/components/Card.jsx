import React from "react";
import imagen1 from "../assets/fanal-gris.jpg";

const Card = () => {
  return (
    <div>
      <img src={imagen1} alt="imagen" style={{ height: "200px" }} />
      <h3>Nombre</h3>
      <p>precio</p>
      <button>Agregar al carrito</button>
    </div>
  );
};

export default Card;
