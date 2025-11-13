import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, use } from "react";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

import UserValidations from "./validations/UserValidations";

const UpdateEmployeeAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    adress: "",
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
  const userRole = localStorage.getItem("user_role");
  const decodedToken = jwtDecode(token);
  const userId = parseInt(decodedToken.sub);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

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
        }

        const response = await fetch(
          `${API_URL}/GetAdminOrEmployeeById/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error al obtener datos del usuario: ${response.status}`
          );
        }

        const data = await response.json();
        // const user = data.find((u) => u.id === userId);
        console.log(data);

        setFormData((prev) => ({
          ...prev,
          id: userId,
          name: data.name || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          adress: data.adress || "",
        }));
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error.message);
        toast.error("Error al cargar los datos: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  function changeHandler(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  const submitHandler = async (event) => {
    event.preventDefault();
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
      if (!token) {
        navigate("/login");
        throw new Error("Token no encontrado. Inicie sesión primero.");
      }

      if (userRole === "Admin") {
        const response = await fetch(`${API_URL}/UpdateAdmin`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Error desconocido al actualizar usuario"
          );
        }
      } else {
        const response = await fetch(`${API_URL}/UpdateEmployee`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Error desconocido al actualizar usuario"
          );
        }
      }
      toast.success("Usuario actualizado correctamente");

      setFormData({
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        adress: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error("Error: " + error.message);
    }
  };
  return (
    <>
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
          <label htmlFor="email">Dirección:</label>{" "}
          <input
            className="register-input"
            type="text"
            name="adress"
            placeholder="Dirección"
            onChange={changeHandler}
            value={formData.adress}
            // ref={phoneRef}
            disabled={isLoading} // ⬅️ Deshabilitado durante la carga
          />
          <button
            type="submit"
            className="register-button"
            disabled={isLoading} // ⬅️ Deshabilitado mientras carga
          >
            {isLoading ? "Cargando..." : "Actualizar"}{" "}
          </button>{" "}
        </form>{" "}
      </div>
    </>
  );
};

export default UpdateEmployeeAdmin;
