// Modal.jsx
import React from "react";
// Asumimos que tienes estilos para 'modal-backdrop' y 'modal-content' en tu CSS

/**
 * Componente reutilizable para mostrar contenido en una superposición modal.
 * @param {boolean} isOpen - Controla si el modal es visible.
 * @param {function} onClose - Función a ejecutar cuando el modal debe cerrarse (e.g., al hacer clic en el fondo o en un botón).
 * @param {React.ReactNode} children - El contenido que se mostrará dentro del modal.
 */
const Modal = ({ isOpen, onClose, children, title = "Detalles" }) => {
  if (!isOpen) {
    return null;
  }

  // Opcional: Cerrar al presionar la tecla ESC
  React.useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? onClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [onClose]);

  return (
    // Backdrop: Al hacer clic aquí se cierra el modal
    <div className="modal-backdrop" onClick={onClose}>
      {/* Contenido: Evita que el clic se propague al fondo, manteniendo el modal abierto */}
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
