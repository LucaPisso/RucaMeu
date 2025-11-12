import homeBackground from "../assets/utils/home-background.jpg";
import flechaHaciaAbajo from "../assets/utils/flecha-hacia-abajo.png";
import "./HomePage.css";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState, useCallback } from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // Usamos la importación estándar

const API_URL = import.meta.env.VITE_API_BASE_URL;

const HomePage = () => {
  // 💡 Estado para los puntos de venta
  const [sellPoints, setSellPoints] = useState([]);
  const [isLoadingSellPoints, setIsLoadingSellPoints] = useState(true);

  // Función para obtener todos los puntos de venta
  const fetchSellPoints = useCallback(async () => {
    setIsLoadingSellPoints(true);
    try {
      // Llama al endpoint [AllowAnonymous]
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
      // Mostrar un toast discreto ya que es la Home
      toast.error("Error al cargar puntos de venta.");
    } finally {
      setIsLoadingSellPoints(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchSellPoints();
  }, [fetchSellPoints]);

  // -------------------------------------------------------------
  // --- Renderizado del Componente ---
  // -------------------------------------------------------------

  return (
    <>
      <Toaster />{" "}
      <section id="first-watch" className="first-watch">
        {" "}
        <img
          className="home-background"
          src={homeBackground}
          alt="fondo"
        />{" "}
        <h1 className="home-background-text">
          OBJETOS DE DECORACIÓN <br /> RUSTICOS Y DELICADOS{" "}
        </h1>{" "}
        <a href="#sell-point-section">
          {" "}
          <div className="catalogo">
            <span>VER PUNTOS DE VENTA</span>
            <img className="flecha" src={flechaHaciaAbajo} alt="flecha" />{" "}
          </div>{" "}
        </a>{" "}
      </section>
      {/* ------------------------------------------------------------- */}
      {/* 💡 NUEVA SECCIÓN: PUNTOS DE VENTA */}
      {/* ------------------------------------------------------------- */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <section id="sell-point-section" className="sell-point-section">
        <div className="sell-point-bg-decor">
          <svg
            className="organic-lines"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
          >
            <path
              d="M0,300 C200,250 400,350 600,280 C800,210 1000,320 1200,260"
              fill="none"
              stroke="rgba(186,140,98,0.25)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="150" cy="280" r="4" fill="rgba(186,140,98,0.4)" />
            <circle cx="620" cy="270" r="5" fill="rgba(186,140,98,0.4)" />
            <circle cx="1080" cy="250" r="3" fill="rgba(186,140,98,0.4)" />
          </svg>
        </div>

        <h2>📍 Encuéntranos</h2>
        {isLoadingSellPoints ? (
          <p>Cargando ubicaciones disponibles...</p>
        ) : sellPoints.length === 0 ? (
          <p>No hay puntos de venta registrados por el momento.</p>
        ) : (
          <div className="sell-point-wrapper">
            <div className="sell-point-grid">
              {sellPoints.map((point) => (
                <div key={point.id} className="sell-point-card-big">
                  <div className="map-column-half">
                    {point.location_link ? (
                      <iframe
                        title={`Mapa de ${point.adress}`}
                        src={point.location_link}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    ) : (
                      <div className="map-placeholder">
                        Ubicación no incrustable
                      </div>
                    )}
                  </div>
                  <div className="details-column-half">
                    <h3>{point.adress}</h3>
                    <p className="detail-date-home">
                      Fecha: {new Date(point.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <Link to={"/products"} className="home-product-link">
        {" "}
        Ver Todos Nuestros Productos
      </Link>{" "}
    </>
  );
};

export default HomePage;
