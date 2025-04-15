import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  function changeHandler(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function submitHandler(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <div>
      <form onSubmit={submitHandler} action="POST">
        <label htmlFor="name">Nombre:</label>
        <br />
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          value={formData.name}
        />
        <br />
        <br />
        <label htmlFor="lastName">Apellido:</label>
        <br />
        <input
          type="text"
          name="lastName"
          onChange={changeHandler}
          value={formData.lastName}
        />
        <br />
        <br />
        <label htmlFor="phone">Teléfono:</label>
        <br />
        <input
          type="text"
          name="phone"
          onChange={changeHandler}
          value={formData.phone}
        />
        <br />
        <br />
        <label htmlFor="email">E-mail:</label>
        <br />
        <input
          type="email"
          name="email"
          onChange={changeHandler}
          value={formData.email}
        />
        <br />
        <br />
        <label htmlFor="password">Contraseña:</label>
        <br />
        <input
          type="password"
          name="password"
          onChange={changeHandler}
          value={formData.password}
        />
        <br />
        <br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
