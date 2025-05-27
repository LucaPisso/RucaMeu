import React from "react";

const ProductValidations = ({ datos }) => {
  const errores = {};

  if (!datos.name?.trim()) {
    errores.name = "El nombre es obligatorio";
  }

  if (!datos.category?.trim()) {
    errores.category = "La categoría es obligatoria";
  }

  if (!datos.price && datos.price !== 0) {
    errores.price = "el precio es obligatorio";
  }

  if (!datos.stock && datos.stock !== 0) {
    errores.stock = "Este campo es obligatorio";
  }

  return errores;
};

export default ProductValidations;
