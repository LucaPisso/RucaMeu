import React, { useState } from "react";

const Register = ({ submit, errors, refs }) => {
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
    submit(formData);
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
          ref={refs.nameRef}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <br />
        <br />
        <label htmlFor="lastName">Apellido:</label>
        <br />
        <input
          type="text"
          name="lastName"
          onChange={changeHandler}
          value={formData.lastName}
          ref={refs.lastNameRef}
        />
        {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
        <br />
        <br />
        <label htmlFor="phone">Teléfono:</label>
        <br />
        <input
          type="text"
          name="phone"
          onChange={changeHandler}
          value={formData.phone}
          ref={refs.phoneRef}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        <br />
        <br />
        <label htmlFor="email">E-mail:</label>
        <br />
        <input
          type="email"
          name="email"
          onChange={changeHandler}
          value={formData.email}
          ref={refs.emailRef}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <br />
        <br />
        <label htmlFor="password">Contraseña:</label>
        <br />
        <input
          type="password"
          name="password"
          onChange={changeHandler}
          value={formData.password}
          ref={refs.passwordRef}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <br />
        <br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
