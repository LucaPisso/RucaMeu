import React from "react";
import { Outlet, Navigate } from "react-router";

const Protected = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    {
      alert("Es necesario iniciar sesión primero.");
    }
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    //propiedad de user: role
    alert("Usted no posee permisos para ingresar aquí");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Protected;
