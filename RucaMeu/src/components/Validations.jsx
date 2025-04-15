import React from "react";

const Validations = ({ datos }) => {
  const errores = {};
  //REGEXS
  const phoneRegex = /^[0-9]{9,12}$/;
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!datos.name.trim()) {
    errores.name = "El nombre es obligatorio";
  }

  if (!datos.lastName.trim()) {
    errores.lastName = "El nombre es obligatorio";
  }

  if (!datos.phone.trim()) {
    errores.phone = "El teléfono es obligatorio";
  } else if (!phoneRegex.test(datos.phone)) {
    errores.phone = "El teléfono no es válido";
  }

  if (!datos.email.trim()) {
    errores.email = "El email es obligatorio";
  } else if (!emailRegex.test(datos.email)) {
    errores.email = "El email no es válido";
  }

  if (!datos.password.trim()) {
    errores.password = "La contraseña es obligatoria";
  } else if (!passwordRegex.test(datos.password)) {
    errores.password = "Mínimo 8 caracteres, incluyendo letras y números";
  }

  return errores;
};

export default Validations;
