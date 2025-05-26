import React from "react";

const ProductValidations = ({ datos }) => {
  const errores = {};

  if (!datos.name.trim()) {
    errores.name = "El nombre es obligatorio";
  }

  if (!datos.price) {
    errores.price = "el precio es obligatorio";
  }

  if (!datos.stock) {
    errores.stock = "Este campo es obligatorio";
  }

  return errores;
};

export default ProductValidations;
