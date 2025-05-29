import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const Protected = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.role);

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
