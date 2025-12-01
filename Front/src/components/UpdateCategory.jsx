import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateCategory = ({ categoryId, onCreationSuccess }) => {
  const [formData, setFormData] = useState({
    id: categoryId,
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("RucaMeu-token");
  const decodedToken = jwtDecode(token);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  //PRIMERO AGARRAMOS LA CATEGORIA
  useEffect(() => {
    const fetchCategory = async () => {
      if (!token) {
        toast.error("Token no encontrado. Inicie sesión.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/GetByIdd/${categoryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message || "Error al obtener la categoría");
          return;
        }
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          name: data.name || "",
          description: data.description || "",
        }));
        console.log(data);
      } catch (error) {
        toast.error("Error al cargar los datos: " + error.message);
      }
    };
    console.log(formData);

    fetchCategory();
  }, [navigate, categoryId, token, API_URL]);

  function changeHandler(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  //AHORA ACTUALIZAMOS LA CATEOGRIA ENCONTRADA
  const submitHandler = async (event) => {
    event.preventDefault();

    if (!confirm("¿Estás seguro de que desea actualizar esta categoria?")) {
      return;
    }

    setIsSubmitting(true);
    // const dataToSend = { ...formData };
    // dataToSend.id = Number(dataToSend.id);

    try {
      if (!token) {
        navigate("/login");
        throw new Error("Token no encontrado. Inicie sesión primero.");
      }

      const response = await fetch(`${API_URL}/UpdateCategory`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error(errorData.message || "Error al obtener la categoría");
        return;
      }

      toast.success("Categoría actualizada correctamente");
      setFormData({
        name: "",
        description: "",
      });
      onCreationSuccess();
      navigate("/products");
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="create-sell-point-page container"></div>
      <Toaster />
      <h1>Editando categoría</h1>
      <form onSubmit={submitHandler} action="PUT" className="sell-point-form">
        <div className="form-group">
          <label htmlFor="name">Nombre (*):</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={changeHandler}
            required
            placeholder="Nombre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción (*):</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={changeHandler}
            required
            placeholder="Descripción"
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Creando..." : "Actualizar categoría"}
        </button>
      </form>
    </>
  );
};

export default UpdateCategory;
