import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserValidations from "./validations/UserValidations";

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
      const res = await fetch("http://localhost:3000/login", {
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
      const data = await res.json();

      if (!data.success) {
        return;
      }

      // Guardar el token en localStorage
      localStorage.setItem("RucaMeu-token", data.token);

      // Guardar estado de login y redirigir
      localStorage.setItem("user", JSON.stringify(data.user));
      setFormData({
        password: "",
        email: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <form action="POST" onSubmit={submitHandler} className="register-form">
        <h2>Iniciar Sesión</h2>
        <label htmlFor="mail">E-mail:</label>
        <input
          className="register-input"
          type="email"
          name="email"
          onChange={changeHandler}
          value={formData.email}
          ref={emailRef}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <br />
        <br />
        <label htmlFor="password">Contraseña:</label>
        <input
          className="register-input"
          type="password"
          name="password"
          onChange={changeHandler}
          value={formData.password}
          ref={passwordRef}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <br />
        <br />
        <button className="register-button" type="submit">
          Ingresar
        </button>
        {errors.server && <p style={{ color: "red" }}>{errors.server}</p>}
      </form>
    </div>
  );
};

export default Login;
