import React from "react";
import imagen1 from "../assets/fanal-madera.jpg";

const Card = ({ Product }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={Product.imageUrl}
        className="card-img-top img-card"
        alt="imagen"
      />
      {/*img-card esta en app.css, pude sobreescribir la de bootstrap*/}
      <div className="card-body">
        <h5 className="card-title">{Product.title}</h5>
        <p className="card-text">{Product.price}</p>
        <a href="#" className="btn">
          Comprar
        </a>
      </div>
    </div>
  );
};

export default Card;
