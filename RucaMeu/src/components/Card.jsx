import React from "react";
import imagen1 from "../assets/fanal-madera.jpg";

const Card = () => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={imagen1} className="card-img-top img-card" alt="imagen" />
      {/*img-card esta en app.css, pude sobreescribir la de bootstrap*/}
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Precio</p>
        <a href="#" className="btn">
          Comprar
        </a>
      </div>
    </div>
  );
};

export default Card;
