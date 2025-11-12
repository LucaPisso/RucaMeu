import toast, { Toaster } from "react-hot-toast";

const ProductDelete = async ({ id, navigate }) => {
  const token = localStorage.getItem("RucaMeu-token");
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  if (!confirm("¿Estás seguro de que desea borrar este producto?")) {
    return false;
  }
  try {
    if (!token) {
      navigate("/login");
      throw new Error("Token no encontrado. Inicie sesión primero.");
    }

    const res = await fetch(`${API_URL}/DeleteProduct/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData || "Error desconocido al borrar producto");
    }
    toast.success("Producto borrado correctamente");
    navigate("/adminPanel");
  } catch (error) {
    console.log(error.message);
    toast.error("Error: " + error.message);
  }
  return true;
};

export default ProductDelete;
