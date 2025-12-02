// CreateSellPointPage.jsx
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Para redirigir después del éxito

// URL base de tu API, ya usada en los otros componentes
const API_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("RucaMeu-token");

const CreateSellPointPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Adress: "",
    Location_link: "",
    // Usamos el formato ISO de fecha para inputs tipo 'datetime-local'
    Date: new Date().toISOString().substring(0, 16),
    Images: "", // Campo opcional para URL(s) de imágenes
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Maneja los cambios en los campos del formulario.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Envía los datos del nuevo punto de venta al endpoint.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Preparar el cuerpo de la solicitud
    // Asegurarse de que Date tenga el formato correcto para el backend C# (ISO 8601)
    const payload = {
      Adress: formData.Adress,
      Location_link: formData.Location_link,
      // Si usas 'datetime-local', ya está en formato ISO, pero aseguramos
      Date: formData.Date,
      Images: formData.Images || null, // Si está vacío, enviar null
    };

    try {
      const res = await fetch(`${API_URL}/CreateSellPoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Intentar leer el mensaje de error del backend
        const errorDetail = await res.text();
        throw new Error(
          `Fallo al crear el punto de venta: ${
            res.status
          }. Detalle: ${errorDetail.substring(0, 50)}...`
        );
      }

      // Si es exitoso
      const newSellPoint = await res.json();
      toast.success(`✅ Punto de Venta creado con éxito!`);

      // Opcional: Redirigir al usuario a la lista de puntos de venta
      setTimeout(() => {
        navigate("/"); // Asume que la lista está en /sellpoints
      }, 1500);
    } catch (err) {
      console.error("Error creating sell point:", err);
      toast.error(
        err.message || "Error desconocido al intentar crear el punto de venta."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-sell-point-page container">
      <h1>Nuevo Punto de Venta</h1>
      <p>
        Ingresa los detalles del nuevo punto de venta para mostrarlo en el sitio
        web.
      </p>

      <form onSubmit={handleSubmit} className="sell-point-form">
        {/* Campo Dirección */}
        <div className="form-group">
          <label htmlFor="Adress">Dirección (*):</label>
          <input
            type="text"
            id="Adress"
            name="Adress"
            value={formData.Adress}
            onChange={handleChange}
            required
            placeholder="Ej: Feria Emprendedor, Stand 15"
          />
        </div>

        {/* Campo Enlace de Ubicación (Mapa) */}
        <div className="form-group">
          <label htmlFor="Location_link">
            Enlace de Ubicación (iFrame/URL del Mapa) (*):
          </label>
          <input
            type="url"
            id="Location_link"
            name="Location_link"
            value={formData.Location_link}
            onChange={handleChange}
            required
            placeholder="URL del mapa incrustable o enlace de Google Maps"
          />
        </div>

        {/* Campo Fecha */}
        <div className="form-group">
          <label htmlFor="Date">Fecha del Evento (*):</label>
          <input
            type="datetime-local"
            id="Date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campo Imágenes (Opcional) */}
        <div className="form-group">
          <label htmlFor="Images">URL de la Imagen (Opcional):</label>
          <input
            type="text"
            id="Images"
            name="Images"
            value={formData.Images}
            onChange={handleChange}
            placeholder="URL de la imagen del punto de venta"
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Creando..." : "Guardar Punto de Venta"}
        </button>
      </form>
    </div>
  );
};

export default CreateSellPointPage;
