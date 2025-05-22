import React from "react";
import Card from "../components/Card";

const HomePage = ({ Product, user, allowedRoles }) => {
  return (
    <>
      HomePage
      <Card key={Product.id} nombre={Product.name} precio={Product.price} />
    </>
  );
};

export default HomePage;
