import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>Página no existente</div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default NotFound;
