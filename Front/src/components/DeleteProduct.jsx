const DeleteProduct = async ({ id, navigate }) => {
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
    alert("Producto eliminado correctamente");
    const data = await res.json();
    console.log(data.message);
    navigate("/products");
  } catch (error) {
    console.log(error.message);
    alert("Error: " + error.message);
  }
  return;
};

export default DeleteProduct;
