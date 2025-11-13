import { jwtDecode } from "jwt-decode";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserValidations from "./validations/UserValidations";

const CreateEmployee = () => {
  //INFO DEL FORMULARIO
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    adress: "",
  });

  //ERRORES DEL FORMULARIO
  const [errors, setErrors] = useState({});
  const lastNameRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const refs = {
    nameRef,
    lastNameRef,
    emailRef,
    phoneRef,
    passwordRef,
  };

  const navigate = useNavigate();

  //DATOS DEL TOKEN Y URL DE LA API
  const token = localStorage.getItem("RucaMeu-token");
  const decodedToken = jwtDecode(token);
  const userId = parseInt(decodedToken.sub);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  //FUNCIONES DEL FORMULARIO
  const changeHandler = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error("Token no encontrado. Inicie sesión.");
      navigate("/login");
      return;
    }

    const newErrors = UserValidations({ datos: formData, refs });
    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) {
      console.warn("Formulario inválido. No se enviará.");
      return;
    }

    if (!confirm("¿Estás seguro de que desea crear este usuario?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/RegisterEmployee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      //Error en la respuesta
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Error desconocido");
        return;
      }
      toast.success("Empleado creado correctamente");
      setFormData({
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        adress: "",
      });
      navigate("/adminPanel");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <div className="register-form">
        <h2 className="register-title">Nuevo empleado</h2>
        <form onSubmit={submitHandler} action="POST">
          <label htmlFor="name">Nombre:</label>
          <input
            className="register-input"
            type="text"
            name="name"
            placeholder="Nombre"
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

          <label htmlFor="phoneNumber">Numero de teléfono:</label>
          <input
            className="register-input"
            type="text"
            name="phoneNumber"
            placeholder="Numero de teléfono"
            onChange={changeHandler}
            value={formData.phoneNumber}
            ref={phoneRef}
          />
          {errors.phoneNumber && (
            <p style={{ color: "red" }}>{errors.phoneNumber}</p>
          )}

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

          <label htmlFor="adress">Dirección:</label>
          <input
            className="register-input"
            type="text"
            name="adress"
            placeholder="Dirección"
            onChange={changeHandler}
            value={formData.adress}
          />

          <button type="submit" className="register-button">
            Registrar
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateEmployee;
