import { jwtDecode } from "jwt-decode";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserValidations from "./validations/UserValidations";

const CreateAdmin = () => {
  //INFO DEL FORMULARIO
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  //ERRORES DEL FORMULARIO
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const refs = {
    nameRef,
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

    if (!confirm(`¿Crear la categoria ${formData.name}?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/CreateCategory`, {
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
      toast.success("Categoria creada correctamente");
      setFormData({
        name: "",
        description: "",
      });
      navigate("/products");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="register-form">
        <h2 className="register-title">Nueva Categoria</h2>
        <button
          type="button"
          onClick={handleGoBack}
          className="btn btn-secondary back-button"
        >
          ← Volver
        </button>
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

          <label htmlFor="lastName">Descripción:</label>
          <input
            className="register-input"
            type="text"
            name="description"
            placeholder="Descripción"
            onChange={changeHandler}
            value={formData.description}
          />

          <button type="submit" className="register-button">
            Agregar
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateAdmin;
