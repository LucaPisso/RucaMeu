// src/components/Card.jsx
import { useNavigate } from "react-router-dom";
import DisableProduct from "./DisableProduct";
import DeleteProduct from "./ProductDelete";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { jwtDecode } from "jwt-decode"; // ⬅️ Asegúrate de tener la importación correcta

const images = import.meta.glob("../assets/products/*.jpg", { eager: true });

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const userRole = localStorage.getItem("user_role");

const Card = ({ product, setDeleteProduct }) => {
  const token = localStorage.getItem("RucaMeu-token");
  const Card = ({ product, setDisableProduct }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    // ⬅️ Decodificación del token para extraer info del usuario
    let userId = null;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Usamos decodedToken.sub y lo convertimos a número (como ya lo haces)
        userId = parseInt(decodedToken.sub);
        // userRole = decodedToken.role; // Puedes usar esto si el rol viene en el token
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        // Si el token no es válido, userId seguirá siendo null
      }
    }
    // Fin de la decodificación

    const increaseQuantity = () =>
      setQuantity((prevQuantity) => prevQuantity + 1);
    const decreaseQuantity = () =>
      setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));

    const handleBuy = async () => {
      // 1. Verificación de autenticación (sin cambios)
      if (!token || !userId) {
        toast.error("❌ Tenés que registrarte para comprar.");
        navigate("/register");
        return;
      } // ➡️ 1. APLICAR VALOR MÍNIMO ESTRICTO ANTES DE USAR

      const finalQuantity = Math.max(1, quantity);

      // ➡️ 2. VALIDACIÓN DE CERO: Si por alguna razón quantity es 0, no continuamos.
      if (finalQuantity === 0) {
        toast.error("La cantidad a comprar debe ser al menos 1.");
        // Opcional: setQuantity(1) para restablecer la vista
        return;
      }

      try {
        // 2. Obtener el cartId usando el userId decodificado
        // Asumo que el endpoint ahora espera el userId en la URL
        const cartRes = await fetch(`${API_BASE_URL}/GetCartByToken`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!cartRes.ok) {
          const cartErrorData = await cartRes.json();
          // Si el usuario existe pero no tiene carrito, el backend debería manejarlo
          throw new Error(
            cartErrorData.message || "Error al obtener el carrito."
          );
        }

        const cartData = await cartRes.json();
        const cartId = cartData.id;

        if (!cartId) {
          throw new Error(
            "No se encontró el ID del carrito para este usuario."
          );
        }

        // 3. Preparar y enviar los 3 parámetros (cartId, productId, cantidad)
        const purchaseData = {
          cartId: cartId,
          productId: product.id,
          quantity: quantity,
        };

        const res = await fetch(`${API_BASE_URL}/AddItemToCart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(purchaseData),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Error al agregar el producto al carrito."
          );
        }

        toast.success(`✅ Agregado ${quantity} x ${product.name} al carrito`);
        setQuantity(1);
      } catch (err) {
        toast.error(`❌ Error en la compra: ${err.message}`);
        console.error(err);
      }
    };
    // ... Código JSX restante ...

    const imageKey = `../assets/products/${product.imgUrl}.jpg`;
    const imgModule = images[imageKey];
    const imgPath = imgModule ? imgModule.default : "/placeholder.jpg";

    return (
      <div className="card" style={{ width: "18rem" }}>
        <Toaster />
        <img src={imgPath} className="card-img-top img-card" alt="imagen" />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">${product.price}</p>
          <div className="cards-buttons">
            {/* Controles de cantidad */}
            <div className="quantity-controls">
              <button
                onClick={decreaseQuantity}
                className="btn btn-sm btn-outline-secondary quantity-btn"
                disabled={quantity === 1}
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="btn btn-sm btn-outline-secondary quantity-btn"
              >
                +
              </button>
            </div>
            <button onClick={handleBuy} className="btn marron">
              Comprar
            </button>
            <div className="cards-admin-buttons">
              {/* Usamos el userRole que ya tenías */}
              {userRole === "Admin" && (
                <button
                  className="btn update"
                  onClick={() => navigate(`/updateProduct/${product.id}`)}
                >
                  ✎
                </button>
              )}

              {userRole === "Admin" && (
                <button
                  className="btn btn-secondary"
                  onClick={async () => {
                    const success = await DisableProduct({
                      id: product.id,
                      navigate,
                    });
                    setDisableProduct(success);
                  }}
                >
                  🔒
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
};
export default Card;
