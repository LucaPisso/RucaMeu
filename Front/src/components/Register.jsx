import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import UserValidations from "./validations/UserValidations";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const refs = {
    lastNameRef,
    nameRef,
    emailRef,
    phoneNumberRef,
    passwordRef,
  };

  const API_URL = import.meta.env.VITE_API_BASE_URL;
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
      const res = await fetch(`${API_URL}/RegisterClient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
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

        <label htmlFor="phoneNumber">Número de teléfono:</label>

        <input
          className="register-input"
          type="text"
          name="phoneNumber"
          placeholder="Número de teléfono"
          onChange={changeHandler}
          value={formData.phoneNumber}
          ref={phoneNumberRef}
        />
        {errors.phoneNumber && (
          <p style={{ color: "red" }}>{errors.phoneNumber}</p>
        )}

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

        <button type="submit" className="register-button">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
