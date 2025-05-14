import React, { useState } from "react";

const Login = (setIsLogged) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const [emailValido, setEmailValido] = useState(true);
  const [passwordValido, setPasswordValido] = useState(true);

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

  function buttonHandler(event) {
    event.preventDefault();

    if (emailValido && passwordValido) {
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": `Bearer ${localStorage.getItem("RucaMeu-token")}`
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((token) => {
          localStorage.setItem("RucaMeu-token", token);
          //successToast("Inicio de sesión exitoso.");
          setIsLogged(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          //errorToast("Error al iniciar sesión.");
          return;
        });

      setPassword("");
      setEmail("");
    }
  }

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
