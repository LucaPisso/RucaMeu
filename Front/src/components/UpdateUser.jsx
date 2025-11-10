import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

import UserValidations from "./validations/UserValidations";

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const lastNameRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const refs = {
    nameRef,
    lastNameRef,
    emailRef,
    phoneRef,
    passwordRef,
  };

  //Get user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("RucaMeu-token");

      if (!token) {
        toast.error("Token no encontrado. Inicie sesión.");
        navigate("/login");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = parseInt(decodedToken.sub); // ID del usuario logueado

        if (isNaN(userId)) {
          throw new Error("El ID de usuario en el token no es numérico.");
        }

        // 1. Almacenar el ID del usuario en el estado
        setFormData((prev) => ({ ...prev, id: userId }));

        // 2. Realizar la petición GET para obtener los datos actuales
        const res = await fetch(
          `https://localhost:7121/GetClientById/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error al obtener datos del usuario: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        // 3. Llenar el formulario con los datos recibidos
        setFormData((prev) => ({
          ...prev,
          name: data.name || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          password: "",
        }));
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error.message);
        toast.error("Error al cargar los datos: " + error.message);
      }
    };

    fetchUser();
  }, [navigate]);

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

      const res = await fetch(`http://localhost:7123/UpdateClient`, {
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
      toast.success("Usuario actualizado correctamente");
      const data = await res.json();
      console.log(`Usuario actualizado: ${data.user}`);
      setFormData({
        name: "",
        lastName: "",
        email: "",
        phone: "",
      });
      navigate("/inicio");
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

        <label htmlFor="lastName">Contraseña:</label>

        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={changeHandler}
          value={formData.password}
          ref={passwordRef}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <button type="submit" className="register-button">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
