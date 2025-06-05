const Logout = ({ navigate }) => {
  if (!confirm("¿Estás seguro de que desea cerrar sesión?")) {
    return;
  }

  localStorage.removeItem("RucaMeu-token");
  localStorage.removeItem("user");
  navigate("/");
};

export default Logout;
