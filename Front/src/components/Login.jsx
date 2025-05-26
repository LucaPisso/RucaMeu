import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = ({ submit, errors, refs }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const [emailValido, setEmailValido] = useState(true);
  const [passwordValido, setPasswordValido] = useState(true);

  const navigate = useNavigate();

  function emailHandler(event) {
    setEmail(event.target.value);
    if (!emailRegex.test(email)) {
      setEmailValido(false);
    } else {
      setEmailValido(true);
    }
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
    if (password === "") {
      setPasswordValido(false);
    } else {
      setPasswordValido(true);
    }
  }

  const buttonHandler = async (event) => {
    event.preventDefault();

    if (!emailValido || !passwordValido) return;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error desconocido");
      }

      // Guardar el token en localStorage
      localStorage.setItem("RucaMeu-token", data.token);
      console.log(localStorage);

      // Guardar estado de login y redirigir
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      console.error("❌ Error de login:", err.message);
      alert("Error: " + err.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <form action="POST">
        <label htmlFor="mail">E-mail:</label>
        <br />
        <input type="email" name="mail" onChange={emailHandler} />
        {!emailValido && (
          <p style={{ color: "red" }}>El formato del email no es válido</p>
        )}
        <br />
        <br />
        <label htmlFor="password">Contraseña:</label>
        <br />
        <input type="password" name="password" onChange={passwordHandler} />
        {!passwordValido && (
          <p style={{ color: "red" }}>No ha ingresado una contraseña</p>
        )}
        <br />
        <br />
        <button type="submit" onClick={buttonHandler}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
