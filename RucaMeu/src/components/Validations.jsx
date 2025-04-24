import React from "react";

const Validations = ({ datos }) => {
  const errores = {};
  //REGEXS
  const fullNameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const phoneRegex = /^[0-9]{9,12}$/;
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!datos.name.trim()) {
    errores.name = "El nombre es obligatorio";
  } else if (datos.name.trim().length < 3) {
    errores.name = "El nombre debe tener minimo 3 letras";
  } else if (!fullNameRegex.test(datos.name)) {
    errores.name = "No se permiten caracteres especiales ni numeros";
  }

  if (!datos.lastName.trim()) {
    errores.lastName = "El apellido es obligatorio";
  } else if (datos.lastName.trim().length < 3) {
    errores.lastName = "El apellido debe tener minimo 3 letras";
  } else if (!fullNameRegex.test(datos.lastName)) {
    errores.lastName = "No se permiten caracteres especiales ni numeros";
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

  if (!datos.confirmPassword.trim()) {
    errores.confirmPassword = "Este campo es obligatorio";
  } else if (datos.password !== datos.confirmPassword) {
    errores.confirmPassword = "Las contraseñas no coinciden";
  }

  return errores;
};

export default Validations;
