import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [button, setButton] = useState(false);
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const [emailValido, setEmailValido] = useState(false);
  const [passwordValido, setPasswordValido] = useState(false);

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

      //chequear que el email y la password existan y sean correctos en la base de datos
      if () {
        setButton(true);
      }
    setButton(false);
    setPassword("");
    setEmail("");
    */
    event.preventDefault();
    if (emailValido && passwordValido) {
      console.log("Se envió la info");
      //formulario.submit()
    } else {
      console.log("Error");
    }
  }

  console.log("email");
  console.log(email);
  console.log("validacion");
  console.log(emailValido);
  console.log("contraseña");
  console.log(password);
  console.log("validacion password");
  console.log(passwordValido);

  console.log("boton");
  console.log(button);

  return (
    <div>
      <form action="POST">
        <label htmlFor="mail">E-mail:</label>
        <br />
        <input type="email" name="mail" onChange={emailHandler} />
        {}
        <br />
        <br />
        <label htmlFor="password">Contraseña:</label>
        <br />
        <input type="password" name="password" onChange={passwordHandler} />
        <br />
        <br />
        <button type="submit" onClick={buttonHandler}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Register;
