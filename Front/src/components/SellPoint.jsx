import React, { useState } from "react";

// Si deseas estilos, recuerda crear y enlazar un archivo CSS:
// import './SellPoint.css';

const SellPoint = ({ Adress, Date, Location_link, Images }) => {
  const imageArray = Images ? Images.split(",").map((url) => url.trim()) : [];

  const carouselContent = [
    ...imageArray.map((url) => ({ type: "image", src: url })),
    ...(Location_link ? [{ type: "map", src: Location_link }] : []),
  ].filter((item) => item.src);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (carouselContent.length === 0 && !Adress && !Date) {
    return null;
  }

  const currentItem = carouselContent[currentIndex];
  const dateFormatted = Date
    ? new window.Date(Date).toLocaleDateString()
    : "Fecha no disponible";

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselContent.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselContent.length) % carouselContent.length
    );
  };

  return (
    <div className="sell-point-container">
      {/* Columna Izquierda: Información de Texto */}
      <div className="sell-point-info">
        <p className="sell-point-address">
          **ADRESS***: {Adress || "Dirección no disponible"}
        </p>
        <p className="sell-point-date">**DATE***: {dateFormatted}</p>

        <div className="sell-point-details">
          <hr />
          {/* Sección de detalles (simulando las líneas de la imagen) */}
          <div className="detail-item">
            <p>Horario: Lunes a Viernes (9:00 - 18:00)</p>
          </div>
          <div className="detail-item">
            <p>Teléfono: +54 11 5555-5555</p>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Carrusel de Contenido (Imágenes y Mapa) */}
      <div className="sell-point-carousel">
        {/* 3. Renderizado Condicional del Contenido */}
        {currentItem && currentItem.type === "image" && (
          <img
            src={currentItem.src}
            alt={`Punto de Venta Imagen ${currentIndex + 1}`}
            className="carousel-image"
          />
        )}

        {currentItem && currentItem.type === "map" && (
          <iframe
            title="Ubicación del Punto de Venta"
            className="carousel-map"
            // Nota: El src debe ser una URL de incrustación de Google Maps
            src={currentItem.src}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        )}

        {/* Controles de Navegación */}
        {carouselContent.length > 1 && (
          <div className="carousel-controls">
            <button onClick={goToPrev}>← Anterior</button>
            <span>
              {currentIndex + 1} / {carouselContent.length}
            </span>
            <button onClick={goToNext}>Siguiente →</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellPoint;
