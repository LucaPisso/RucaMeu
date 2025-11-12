import { useEffect, useState, useCallback } from "react"; // ⬅️ Añadimos useCallback
import { useNavigate } from "react-router-dom"; // ⬅️ Importamos useNavigate
import toast, { Toaster } from "react-hot-toast";
import CardItemCart from "../components/CardItemCart";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const token = localStorage.getItem("RucaMeu-token");
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const fetchCarrito = useCallback(async () => {
    try {
      if (!token) {
        toast.error("Debes iniciar sesión para ver el carrito");
        navigate("/login");
        return;
      }
      const res = await fetch(`${API_URL}/GetCartByToken`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Falló al obtener productos");
      const response = await res.json();
      setCarrito(response.items);
      setTotalPrice(response.totalPrice);
    } catch (err) {
      console.error(err);
      toast.error("Error: " + err.message);
    }
  }, [token, API_URL, navigate]); // Dependencias para useCallback

  const handleRemoveItem = async (productId) => {
    if (!token) return;

    try {
      const res = await fetch(
        `${API_URL}/DeleteItemCart?productId=${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Falló al eliminar el producto.");
      }

      toast.success("🗑️ Producto eliminado del carrito.");

      // 2. Recargar todo el carrito para actualizar la lista y los totales
      fetchCarrito();
    } catch (err) {
      console.error(err);
      toast.error("❌ Error al eliminar: " + err.message);
    }
  };

  useEffect(() => {
    fetchCarrito();
  }, [fetchCarrito]); // El efecto se ejecuta solo cuando fetchCarrito cambia (que es al inicio)

  return (
    <>
      <Toaster /> {/* Asegúrate de que Toaster esté aquí */} <h1>Mi carrito</h1>{" "}
      <div className="card-container">
        {/* Mostrar TotalPrice con dos decimales */}{" "}
        {carrito.length > 0 ? (
          carrito.map((item) => (
            // 💡 PASAMOS LA FUNCIÓN DE RECARGA AL HIJO
            <CardItemCart
              key={item.productDTO.id}
              item={item}
              onUpdateCart={fetchCarrito} // ⬅️ Nuevo prop
              onRemove={handleRemoveItem} // ⬅️ Nuevo prop
            />
          ))
        ) : (
          <h1>No hay productos en el carrito.</h1>
        )}{" "}
        <h2>Total: ${totalPrice.toFixed(2)}</h2>{" "}
      </div>{" "}
    </>
  );
};

export default CarritoPage;
