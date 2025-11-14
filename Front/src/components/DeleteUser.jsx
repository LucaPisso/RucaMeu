import toast, { Toaster } from "react-hot-toast";

const DeleteUser = async ({ id, navigate }) => {
  const token = localStorage.getItem("RucaMeu-token");
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  if (!confirm("¿Estás seguro de que desea eliminar este usuario?")) {
    return false;
  }

  let data = null;

  try {
    if (!token) {
      navigate("/login");
      throw new Error("Token no encontrado. Inicie sesión primero.");
    }

    const res = await fetch(`${API_URL}/DeleteUser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      data = await res.json();
    } catch (e) {
      // Intencionalmente vacío
    }

    if (!res.ok) {
      const errorMessage =
        data && data.message
          ? data.message
          : "Error desconocido al eliminar usuario";

      if (data && (data.id === 1 || data.id === 2 || data.id === 3)) {
        toast.error("Los superAdmins no se pueden eliminar");
        return false;
      }

      throw new Error(errorMessage);
    }

    if (data && (data.id === 1 || data.id === 2 || data.id === 3)) {
      toast.error("Los superAdmins no se pueden eliminar");
      return false;
    }

    toast.success("Usuario eliminado correctamente");
    console.log(res);

    navigate("/adminPanel");
  } catch (error) {
    const displayMessage =
      error.message || "No puedes eliminar un SuperAdmin o error general";
    toast.error(displayMessage);
  }
  return true;
};

export default DeleteUser;
