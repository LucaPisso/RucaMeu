//A REALIZAR:
//Deshashear la contraseña al traerla. O directamente no traerla.

import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

import UserValidations from "./validations/UserValidations";

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const lastNameRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const refs = {
    nameRef,
    lastNameRef,
    phoneRef,
    emailRef,
    confirmPasswordRef,
    passwordRef,
  };

  //Get user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("RucaMeu-token");

        if (!token) {
          navigate("/login");
          throw new Error("Token no encontrado. Inicie sesión primero.");
        }

        const res = await fetch(`http://localhost:3000/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "Error desconocido al buscar un usuario"
          );
        }

        const data = await res.json();
        console.log(data.user);
        setFormData({
          ...data.user,
          confirmPassword: "",
        });
      } catch (error) {
        console.log(error.message);
        alert("Error: " + error.message);
      }
    };

    fetchUser();
  }, []);
  //

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

    if (!confirm("¿Estás seguro de que desea actualizar este usuario?")) {
      return;
    }

    try {
      const token = localStorage.getItem("RucaMeu-token");
      if (!token) {
        navigate("/login");
        throw new Error("Token no encontrado. Inicie sesión primero.");
      }

      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Error desconocido al actualizar usuario"
        );
      }
      alert("Usuario actualizado correctamente");
      const data = await res.json();
      console.log(`Usuario actualizado: ${data.user}`);
      setFormData({
        lastName: "",
        name: "",
        phone: "",
        password: "",
        email: "",
        confirmPassword: "",
        role: "user",
      });
      navigate("/adminPanel");
    } catch (error) {
      console.log(error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="register-form">
      <h2 className="register-title">Editando usuario</h2>
      <form onSubmit={submitHandler} action="POST">
        <label htmlFor="name">Nombre:</label>

        <input
          className="register-input"
          type="text"
          name="name"
          placeholder="Nombre del Producto"
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

        <label htmlFor="phone">Número de teléfono:</label>

        <input
          className="register-input"
          type="text"
          name="phone"
          placeholder="Número de teléfono"
          onChange={changeHandler}
          value={formData.phone}
          ref={phoneRef}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

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

        <label htmlFor="confirmPassword">Repita la contraseña:</label>

        <input
          className="register-input"
          type="password"
          name="confirmPassword"
          onChange={changeHandler}
          value={formData.confirmPassword}
          ref={confirmPasswordRef}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword}</p>
        )}

        <label htmlFor="role">Rol:</label>
        <select
          className="register-input"
          name="role"
          value={formData.role}
          onChange={changeHandler}
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit" className="register-button">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
