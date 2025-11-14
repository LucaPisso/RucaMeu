import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CardItemCart from "../components/CardItemCart";
import "./ProductsPage.css";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartIdUser, setCartIdUser] = useState(0);
  const [message, setMessage] = useState("");
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
      console.log(response.items);

      setCarrito(response.items);
      setTotalPrice(response.totalPrice);
      if (response.items && response.items.length > 0) {
        setCartIdUser(response.items[0].cartId);
      } else {
        setCartIdUser(0);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error: " + err.message);
    }
  }, [token, API_URL, navigate]);

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

      fetchCarrito();
    } catch (err) {
      console.error(err);
      toast.error("❌ Error al eliminar: " + err.message);
    }
  };

  useEffect(() => {
    fetchCarrito();
  }, [fetchCarrito]);

  const sendQuery = async () => {
    if (!token) {
      toast.error("Debes iniciar sesión para enviar una consulta");
      navigate("/login");
      return;
    }

    if (carrito.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }

    if (message.trim() === "") {
      toast.error("Debes escribir un mensaje");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/CreateQuery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          CartId: cartIdUser,
          Message: message,
        }),
      });

      if (!response.ok) {
        let errorText = `Error ${response.status}: Falló la consulta.`;
        try {
          const errorData = await response.json();
          errorText = errorData.message || errorData.title || errorText;
        } catch (e) {
          console.error("Error al parsear respuesta de error:", e);
        }
        toast.error(`❌ ${errorText}`);
        throw new Error(errorText);
      }

      toast.success("✅ Consulta enviada correctamente");
      setCarrito([]);
      setTotalPrice(0);
      setMessage("");
      setCartIdUser(0);
      navigate("/products");
    } catch (error) {
      console.error("Error inesperado en sendQuery:", error);
      toast.error(
        "❌ Ocurrió un error inesperado. Revisa la consola para más detalles."
      );
    }
  };
  return (
    <>
      <Toaster />
      {/* <h1 className="cart-title">Mi carrito</h1>{" "} */}
      <div className="cart-main-layout">
        <div className="cart-items-column">
          <div className="card-container-cart">
            {carrito.length > 0 ? (
              carrito.map((item) => (
                <CardItemCart
                  key={item.productDTO.id}
                  item={item}
                  onUpdateCart={fetchCarrito}
                  onRemove={handleRemoveItem}
                />
              ))
            ) : (
              <div className="empty-cart-message">
                <h1>Tu carrito está vacío.</h1>
                <p>¡Explora nuestros productos y encuentra tu pieza ideal!</p>
                <button
                  onClick={() => navigate("/products")}
                  className="browse-products-button"
                >
                  Ver Productos →
                </button>
              </div>
            )}
          </div>

          <h2 className="cart-total">Total: ${totalPrice.toFixed(2)}</h2>
        </div>

        <div className="cart-query-column">
          <div className="query-box">
            <h3 className="query-title">CONSULTAR CARRITO CON RUCAMEU</h3>

            <textarea
              className="query-textarea"
              rows="10"
              placeholder="MENSAJE..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="query-button" onClick={sendQuery}>
              Enviar Consulta
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarritoPage;
