import React from "react";
import Card from "../components/Card";

const HomePage = ({ user, allowedRoles }) => {
  return (
    <>
      HomePage
      <Card />
      {user?.role === "admin" && (
        <button onClick={() => console.log("Agregar producto")}>
          ➕ Agregar producto
        </button>
      )}
    </>
  );
};

export default HomePage;
