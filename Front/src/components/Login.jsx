import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserValidations from "./validations/UserValidations";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const refs = {
    emailRef,
    passwordRef,
  };
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

    try {
      const res = await fetch("https://localhost:7121/LogIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseBodyText = await res.text();
      if (!res.ok) {
        throw new Error(
          responseBodyText || `Error ${res.status}: Fallo de autenticación.`
        );
      }
      const tokenString = responseBodyText;

      localStorage.setItem("RucaMeu-token", tokenString); // Limpiar formulario y redirigir

      setFormData({
        password: "",
        email: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error.message); // El error.message ahora contendrá el mensaje de error del servidor o el mensaje que definiste.
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="register-form">
      <h2 className="register-title">Iniciar Sesión</h2>
      <form action="POST" onSubmit={submitHandler}>
        <Link className="link-to-login" to="/register">
          ¿No tienes una cuenta aún en RucaMeu?
        </Link>
        <label htmlFor="mail">E-mail:</label>
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

        <button className="register-button" type="submit">
          Ingresar
        </button>
        {errors.server && <p style={{ color: "red" }}>{errors.server}</p>}
      </form>
    </div>
  );
};

export default Login;
