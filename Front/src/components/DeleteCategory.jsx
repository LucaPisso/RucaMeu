import { toast } from "react-hot-toast";

const DeleteCategory = async ({ id, navigate }) => {
  const token = localStorage.getItem("RucaMeu-token");
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  if (!confirm("¿Estás seguro de que desea eliminar esta categoria?")) {
    return false;
  }
  try {
    if (!token) {
      navigate("/login");
      throw new Error("Token no encontrado. Inicie sesión primero.");
    }

    const res = await fetch(`${API_URL}/DeleteCategory/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "Error desconocido al eliminar categoria"
      );
    }
    toast.success("Categoria eliminada correctamente");
    navigate("/products");
  } catch (error) {
    console.log(error.message);
    toast.error("Error: " + error.message);
  }
  return true;
};

export default DeleteCategory;
