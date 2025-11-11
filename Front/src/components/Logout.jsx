const Logout = ({ navigate }) => {
  if (!confirm("¿Estás seguro de que desea cerrar sesión?")) {
    return;
  }

  localStorage.removeItem("RucaMeu-token");
  localStorage.removeItem("user_role");
  localStorage.removeItem("user_id");
  navigate("/");
};

export default Logout;
