import toast, { Toaster } from "react-hot-toast";

const EnableProduct = async ({ id, navigate }) => {
  const token = localStorage.getItem("RucaMeu-token");
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  if (!confirm("¿Estás seguro de que desea habilitar este producto?")) {
    return false;
  }
  try {
    if (!token) {
      navigate("/login");
      throw new Error("Token no encontrado. Inicie sesión primero.");
    }

    const res = await fetch(`${API_URL}/EnableProduct/${id}`, {
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
        errorData.message || "Error desconocido al habilitar producto"
      );
    }
    toast.success("Producto habilitado correctamente");
    navigate("/adminPanel");
  } catch (error) {
    console.log(error.message);
    toast.error("Error: " + error.message);
  }
  return true;
};

export default EnableProduct;
