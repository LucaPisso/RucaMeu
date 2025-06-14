import toast, { Toaster } from "react-hot-toast";

const DeleteProduct = async ({ id, navigate }) => {
  if (!confirm("¿Estás seguro de que desea eliminar este producto?")) {
    return false;
  }
  try {
    const token = localStorage.getItem("RucaMeu-token");
    if (!token) {
      navigate("/login");
      throw new Error("Token no encontrado. Inicie sesión primero.");
    }

    const res = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "Error desconocido al eliminar producto"
      );
    }
    toast("Producto eliminado correctamente", {
      icon: "🗑",
    });
    const data = await res.json();
    console.log(data.message);
    navigate("/products");
  } catch (error) {
    console.log(error.message);
    toast.error("Error: " + error.message);
  }
  return true;
};

export default DeleteProduct;
