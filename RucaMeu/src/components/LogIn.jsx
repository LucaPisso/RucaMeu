import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [button, setButton] = useState(false);
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
    /*
    event.preventDefault();
      //chequear que el email y la password existan y sean correctos en la base de datos
      if () {
        setButton(true);
      }
    setButton(false);
    setPassword("");
    setEmail("");
    */
  }

  console.log("hola");
  console.log("email");
  console.log(email);
  console.log("validacion");
  console.log(emailValido);
  console.log("contraseña");
  console.log(password);
  console.log("boton");
  console.log(button);

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
