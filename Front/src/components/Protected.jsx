import React from "react";
import { Outlet, Navigate } from "react-router";

const Protected = ({ user, allowedRoles }) => {
  if (!user) {
    {
      alert("Es necesario iniciar sesión primero.");
    }
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    //propiedad de user: role
    // return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default Protected;
