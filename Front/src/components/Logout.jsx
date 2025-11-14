import toast, { Toaster } from "react-hot-toast";

const Logout = ({ navigate }) => {
  localStorage.removeItem("RucaMeu-token");
  localStorage.removeItem("user_role");
  localStorage.removeItem("user_id");

  toast.success("Sesión cerrada correctamente");

  navigate("/");
};

export default Logout;
