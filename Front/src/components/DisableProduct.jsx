import toast, { Toaster } from "react-hot-toast";

const DisableProduct = async ({ id, navigate }) => {
  const token = localStorage.getItem("RucaMeu-token");
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  if (!confirm("¿Estás seguro de que desea deshabilitar este producto?")) {
    return false;
  }
  try {
    if (!token) {
      navigate("/login");
      throw new Error("Token no encontrado. Inicie sesión primero.");
    }

    const res = await fetch(`${API_URL}/DisableProduct/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(
        errorData.message || "Error desconocido al deshabilitar producto"
      );
    }
    toast.success("Producto deshabilitado correctamente");
    navigate("/products");
  } catch (error) {
    console.log(error.message);
    toast.error("Error: " + error.message);
  }
  return true;
};

export default DisableProduct;
