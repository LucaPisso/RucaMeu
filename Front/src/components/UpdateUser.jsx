import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

import UserValidations from "./validations/UserValidations";

const UpdateUser = () => {
  // Nuevo estado para controlar la carga de datos de la API
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const lastNameRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const refs = {
    nameRef,
    lastNameRef,
    emailRef,
    phoneRef,
  };
  const token = localStorage.getItem("RucaMeu-token");
  const decodedToken = jwtDecode(token);
  const userId = parseInt(decodedToken.sub);
  const userRole = decodedToken.role;

  const API_URL = import.meta.env.VITE_API_BASE_URL; //Get user

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        toast.error("Token no encontrado. Inicie sesión.");
        navigate("/login");
        setIsLoading(false); // Asegurar que el loading se apague
        return;
      }

      try {
        if (isNaN(userId)) {
          throw new Error("El ID de usuario en el token no es numérico.");
        } // 1. Almacenar el ID del usuario en el estado

        setFormData((prev) => ({ ...prev, id: Number(userId) })); // 2. Realizar la petición GET para obtener los datos actuales

        const res = await fetch(`${API_URL}/GetClientById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error al obtener datos del usuario: ${res.status}`);
        }

        const data = await res.json();
        console.log(data); // 3. Llenar el formulario con los datos recibidos

        setFormData((prev) => ({
          ...prev,
          name: data.name || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
        }));
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error.message);
        toast.error("Error al cargar los datos: " + error.message);
      } finally {
        // Detener el estado de carga cuando la promesa termina (éxito o error)
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]); //Maneja constantemente los cambios de los inputs

  function changeHandler(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const submitHandler = async (event) => {
    event.preventDefault(); // Si el formulario aún está cargando datos, no validar
    if (isLoading) {
      console.warn("Aún cargando datos, intente de nuevo.");
      return;
    }

    const newErrors = UserValidations({ datos: formData, refs });
    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) {
      console.warn("Formulario inválido. No se enviará.");
      return;
    }

    if (!confirm("¿Estás seguro de que desea actualizar este usuario?")) {
      return;
    }
    const dataToSend = { ...formData };
    dataToSend.id = Number(dataToSend.id);

    try {
      // const token = localStorage.getItem("RucaMeu-token");
      if (!token) {
        navigate("/login");
        throw new Error("Token no encontrado. Inicie sesión primero.");
      }

      const res = await fetch(`${API_URL}/UpdateClient`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Error desconocido al actualizar usuario"
        );
      }
      toast.success("Usuario actualizado correctamente");
      const data = await res.json();
      console.log(`Usuario actualizado: ${data.user}`);
      setFormData({
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      });
      navigate("/inicio");
    } catch (error) {
      console.log(error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="register-form">
      <h2 className="register-title">Editando usuario</h2>{" "}
      <form onSubmit={submitHandler} action="POST">
        <label htmlFor="name">Nombre:</label>{" "}
        <input
          className="register-input"
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={changeHandler}
          value={formData.name}
          ref={nameRef}
          disabled={isLoading} // ⬅️ Deshabilitado durante la carga
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <label htmlFor="lastName">Apellido:</label>{" "}
        <input
          className="register-input"
          type="text"
          name="lastName"
          placeholder="Apellido"
          onChange={changeHandler}
          value={formData.lastName}
          ref={lastNameRef}
          disabled={isLoading} // ⬅️ Deshabilitado durante la carga
        />{" "}
        {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>} 
        <label htmlFor="phoneNumber">Número de teléfono:</label>{" "}
        <input
          className="register-input"
          type="text"
          name="phoneNumber"
          placeholder="Número de teléfono"
          onChange={changeHandler}
          value={formData.phoneNumber}
          ref={phoneRef}
          disabled={isLoading} // ⬅️ Deshabilitado durante la carga
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        <label htmlFor="email">Email:</label>{" "}
        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={changeHandler}
          value={formData.email}
          ref={emailRef}
          disabled={isLoading} // ⬅️ Deshabilitado durante la carga
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}{" "}
        <button
          type="submit"
          className="register-button"
          disabled={isLoading} // ⬅️ Deshabilitado mientras carga
        >
          {isLoading ? "Cargando..." : "Actualizar"}{" "}
        </button>{" "}
      </form>{" "}
    </div>
  );
};

export default UpdateUser;
