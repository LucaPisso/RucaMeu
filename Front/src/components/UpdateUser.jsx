import React from 'react'
import { useEffect } from 'react';

const UpdateUser = () => {

    useEffect(async() => {
        try {
        const res = await fetch("http://localhost:3000/users/:id", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

      if (!response.ok) {
        throw new Error(data.message || "Error desconocido");
      }

    } catch (err) {
      console.error("❌ Error:", err.message);
      alert("Error: " + err.message);
    }
    }, []);

  return (
    <></>
  )
}

export default UpdateUser;


import React, { useState } from "react";

const Register = ({ submit, errors, refs }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const isValid = submit(formData);
    if (isValid) {
      console.warn("Formulario inválido. No se enviará.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Falló crear usuario");
      const data = await res.json();
      console.log(data);

      setFormData({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-form">
      <h2 className="register-title">Crea una nueva cuenta</h2>
      <form onSubmit={submitHandler} action="POST">
        <label htmlFor="name">Nombre:</label>

        <input
          className="register-input"
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={changeHandler}
          value={formData.name}
          ref={refs.nameRef}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <label htmlFor="lastName">Apellido:</label>

        <input
          className="register-input"
          type="text"
          name="lastName"
          placeholder="Apellido"
          onChange={changeHandler}
          value={formData.lastName}
          ref={refs.lastNameRef}
        />
        {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}

        <label htmlFor="phone">Teléfono:</label>

        <input
          className="register-input"
          type="text"
          name="phone"
          placeholder="Número de teléfono"
          onChange={changeHandler}
          value={formData.phone}
          ref={refs.phoneRef}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

        <label htmlFor="email">E-mail:</label>

        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="tuemail@ejemplo.com"
          onChange={changeHandler}
          value={formData.email}
          ref={refs.emailRef}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <label htmlFor="password">Contraseña:</label>

        <input
          className="register-input"
          type="password"
          name="password"
          onChange={changeHandler}
          value={formData.password}
          ref={refs.passwordRef}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <label htmlFor="confirmPassword">Repite la contraseña:</label>

        <input
          className="register-input"
          type="password"
          name="confirmPassword"
          onChange={changeHandler}
          value={formData.confirmPassword}
          ref={refs.confirmPasswordRef}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword}</p>
        )}
        <button type="submit" className="register-button">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
