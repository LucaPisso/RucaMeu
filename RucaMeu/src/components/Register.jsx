import React, { useState } from "react";

const Register = () => {
  //ESTADOS
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [button, setButton] = useState(false);

  //REGEX
  const phoneRegex = /^[0-9]{9,12}$/;
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  //ESTADOS DE VALIDACIONES
  const [nameValido, setNameValido] = useState(false);
  const [lastNameValido, setlastNameValido] = useState(false);
  const [phoneValido, setPhoneValido] = useState(false);
  const [emailValido, setEmailValido] = useState(false);
  const [passwordValido, setPasswordValido] = useState(false);

  //HANDLERS

  function nameHandler(event) {
    setName(event.target.value);
    if (name === "") {
      setNameValido(false);
    } else {
      setNameValido(true);
    }
  }

  function lastNameHandler(event) {
    setLastName(event.target.value);
    setName(event.target.value);
    if (!lastName) {
      setlastNameValido(false);
    } else {
      setlastNameValido(true);
    }
  }

  function phoneHandler(event) {
    setPhone(event.target.value);
    if (!phoneRegex.test(phone)) {
      setPhoneValido(false);
    } else {
      setPhoneValido(true);
    }
  }

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
    } else if (password.length < 8) {
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
    if (
      emailValido &&
      passwordValido &&
      phoneValido &&
      nameValido &&
      lastNameValido
    ) {
      console.log("Se envió la info");
      //formulario.submit()
    } else {
      console.log("Error");
    }
  }

  console.log("validacion name");
  console.log(nameValido);

  console.log("validacion lastName");
  console.log(lastNameValido);

  console.log("validacion phone");
  console.log(phoneValido);

  console.log("validacion email");
  console.log(emailValido);

  console.log("validacion password");
  console.log(passwordValido);

  console.log("boton");
  console.log(button);

  return (
    <div>
      <form action="POST">
        <label htmlFor="name">Nombre:</label>
        <br />
        <input type="text" name="name" onChange={nameHandler} />
        <br />
        <br />
        <label htmlFor="lastName">Apellido:</label>
        <br />
        <input type="text" name="lastName" onChange={lastNameHandler} />
        <br />
        <br />
        <label htmlFor="phone">Teléfono:</label>
        <br />
        <input type="text" name="phone" onChange={phoneHandler} />
        <br />
        <br />
        <label htmlFor="email">E-mail:</label>
        <br />
        <input type="email" name="email" onChange={emailHandler} />
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
