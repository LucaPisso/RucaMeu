import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

import UserValidations from "./validations/UserValidations";

const Register = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const lastNameRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const refs = {
    nameRef,
    lastNameRef,
    phoneRef,
    emailRef,
    confirmPasswordRef,
    passwordRef,
  };

  //Maneja constantemente los cambios de los inputs
  function changeHandler(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const newErrors = UserValidations({ datos: formData, refs }); // Hay que crear una variable extra, ya que el estado no se actualiza instantáneamente
    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) {
      console.warn("Formulario inválido. No se enviará.");
      return;
    }

    if (!confirm("¿Estás seguro de que desea crear este usuario?")) {
      return;
    }

    try {
      // const token = localStorage.getItem("RucaMeu-token");
      // if (!token) {
      //   navigate("/login");
      //   throw new Error("Token no encontrado. Inicie sesión primero.");
      // }

      const res = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Error desconocido al crear usuario"
        );
      }
      toast.success("Usuario creado correctamente");
      const data = await res.json();
      console.log(`Usuario creado: ${data.user}`);
      setFormData({
        lastName: "",
        name: "",
        phone: "",
        password: "",
        email: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="register-form">
      <h2 className="register-title">Crear usuario</h2>
      <Link className="link-to-login" to="/login">
        ¿Ya tienes una cuenta en RucaMeu?
      </Link>
      <form onSubmit={submitHandler} action="POST">
        <label htmlFor="name">Nombre:</label>

        <input
          className="register-input"
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={changeHandler}
          value={formData.name}
          ref={nameRef}
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
          ref={lastNameRef}
        />
        {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}

        <label htmlFor="phone">Número de teléfono:</label>

        <input
          className="register-input"
          type="text"
          name="phone"
          placeholder="Número de teléfono"
          onChange={changeHandler}
          value={formData.phone}
          ref={phoneRef}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

        <label htmlFor="email">Email:</label>

        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={changeHandler}
          value={formData.email}
          ref={emailRef}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <label htmlFor="password">Contraseña:</label>

        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={changeHandler}
          value={formData.password}
          ref={passwordRef}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <label htmlFor="confirmPassword">Repita la contraseña:</label>

        <input
          className="register-input"
          type="password"
          name="confirmPassword"
          onChange={changeHandler}
          value={formData.confirmPassword}
          ref={confirmPasswordRef}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword}</p>
        )}

        <button type="submit" className="register-button">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
