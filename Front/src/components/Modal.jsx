// Modal.jsx
import React from "react";

/**
 * Componente reutilizable para mostrar contenido en una superposición modal.
 * @param {boolean} isOpen - Controla si el modal es visible.
 * @param {function} onClose - Función a ejecutar cuando el modal debe cerrarse.
 * @param {string} title - El título que se mostrará en el encabezado.
 * @param {React.ReactNode} children - El contenido que se mostrará dentro del modal.
 */
const Modal = ({ isOpen, onClose, children, title = "Detalles" }) => {
  if (!isOpen) {
    return null;
  }

  // 1. Cierra al presionar la tecla ESC
  React.useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? onClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [onClose]);

  // 2. Controla el clic en el fondo (backdrop)
  const handleBackdropClick = (e) => {
    // Solo cerramos si el evento target es exactamente el fondo oscuro.
    if (e.target.className === "modal-backdrop") {
      onClose();
    }
  };

  return (
    // Backdrop: Usa la función específica para el clic en el fondo
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
