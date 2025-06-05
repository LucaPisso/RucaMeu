import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Protected = ({ allowedRoles }) => {
  const token = localStorage.getItem("RucaMeu-token");
  let user = null;
  const rawUser = localStorage.getItem("user");

  if (!token) {
    alert("Debe iniciar sesión para acceder a esta página.");
    return <Navigate to="/login" replace />;
  }

  // 2. Verificar validez y expiración del token
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // jwt exp está en segundos

    if (decodedToken.exp < currentTime) {
      alert("Su sesión ha expirado. Por favor, inicie sesión nuevamente.");
      localStorage.removeItem("user");
      localStorage.removeItem("RucaMeu-token");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    alert("Su sesión es inválida. Por favor, inicie sesión nuevamente.");
    localStorage.removeItem("user");
    localStorage.removeItem("RucaMeu-token");
    return <Navigate to="/login" replace />;
  }

  if (rawUser) {
    try {
      user = JSON.parse(rawUser);
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("RucaMeu-token");
      return <Navigate to="/login" replace />;
    }
  }

  // VERIFICAMOS QUE EL USUARIO ESTE AUTENTICADO.
  if (!user) {
    localStorage.removeItem("user");
    localStorage.removeItem("RucaMeu-token");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!user.role || !allowedRoles.includes(user.role))) {
    alert("Usted no posee los permisos necesarios para acceder a esta página.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default Protected;
