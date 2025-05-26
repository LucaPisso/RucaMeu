import React from "react";
import Card from "../components/Card";

const HomePage = ({ Product, user, allowedRoles }) => {
  return (
    <>
      <h1>HomePage</h1>
      {/* <Card></Card> key={Product.id} nombre={Product.name} precio={Product.price} /> */}
      {/* {user?.role === "admin" && (
        <button onClick={() => console.log("Agregar producto")}>
          ➕ Agregar producto
        </button>
      )} */}
    </>
  );
};

export default HomePage;
