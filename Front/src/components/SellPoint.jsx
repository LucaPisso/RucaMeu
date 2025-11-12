import { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const SellPointListPage = () => {
  const [sellPoints, setSellPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // El token no es necesario para esta función pública
  const fetchSellPoints = useCallback(async () => {
    setIsLoading(true);
    try {
      // Este endpoint es [AllowAnonymous]
      const res = await fetch(`${API_URL}/GettAllSellPoints`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Falló al cargar los puntos de venta.");

      const data = await res.json();
      setSellPoints(data);
    } catch (err) {
      console.error("Error fetching sell points:", err);
      toast.error("Error al cargar los datos: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchSellPoints();
  }, [fetchSellPoints]);

  if (isLoading) {
    return <div>Cargando puntos de venta...</div>;
  }

  return (
    <div className="sell-point-list-page">
      <Toaster />
      <h1>📍 Nuestros Puntos de Venta</h1>

      {/* Aquí podrías añadir un campo de búsqueda */}

      <div className="sell-point-grid">
        {sellPoints.length === 0 ? (
          <p>No hay puntos de venta disponibles en este momento.</p>
        ) : (
          sellPoints.map((point) => (
            <div key={point.id} className="sell-point-card">
              <h3>{point.adress}</h3>
              <p>Fecha: {new Date(point.date).toLocaleDateString()}</p>
              <p>
                <a
                  href={point.location_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver en Mapa 🗺️
                </a>
              </p>
              {/* Mostrar imagen si existe */}
              {point.images && <p>Imágenes disponibles</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellPointListPage;
