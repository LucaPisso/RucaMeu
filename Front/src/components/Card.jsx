// src/components/Card.jsx
import { useNavigate } from "react-router-dom";
import DisableProduct from "./DisableProduct";
import DeleteProduct from "./ProductDelete"; // Se mantiene por si se usa en el futuro, aunque no se usa en el código visible.
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const Card = ({ product, setDisableProduct }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("RucaMeu-token");
  const { id, name, description, price, imgUrl, stock, categoryDTO } = product;
  const categoryName = categoryDTO ? categoryDTO.name : "Sin Categoría";
  const images = import.meta.glob("../assets/products/*.jpg", { eager: true });
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userRole = localStorage.getItem("user_role");

  let userId = null;

  if (token) {
    try {
      // Usamos jwtDecode directamente
      const decodedToken = jwtDecode(token);
      // Convertimos el 'sub' (subject, típicamente el ID de usuario) a número
      userId = parseInt(decodedToken.sub);
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
    // 1. Verificación de autenticación
    if (!token || !userId) {
      toast.error("❌ Tenés que registrarte para comprar.");
      navigate("/register");
      return;
    }

    // Asegurar que la cantidad sea al menos 1
    const finalQuantity = Math.max(1, quantity);

    // 2. VALIDACIÓN DE CERO
    if (finalQuantity === 0) {
      toast.error("La cantidad a comprar debe ser al menos 1.");
      return;
    }

    try {
      // 2. Obtener el cartId usando el token
      const cartRes = await fetch(`${API_BASE_URL}/GetCartByToken`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!cartRes.ok) {
        const cartErrorData = await cartRes.json();
        throw new Error(
          cartErrorData.message || "Error al obtener el carrito."
        );
      }

      const cartData = await cartRes.json();
      const cartId = cartData.id;

      if (!cartId) {
        throw new Error("No se encontró el ID del carrito para este usuario.");
      }

      // 3. Preparar y enviar los 3 parámetros (cartId, productId, quantity)
      const purchaseData = {
        cartId: cartId,
        productId: product.id,
        quantity: finalQuantity, // Usamos finalQuantity
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

      toast.success(
        `✅ Agregado ${finalQuantity} x ${product.name} al carrito`
      );
      setQuantity(1); // Restablecer la cantidad a 1 después de la compra
    } catch (err) {
      toast.error(`❌ Error en la compra: ${err.message}`);
      console.error(err);
    }
  };

  // Obtención de la ruta de la imagen
  const imageKey = `../assets/products/${product.imgUrl}.jpg`;
  const imgModule = images[imageKey];
  const imgPath = imgModule ? imgModule.default : "/placeholder.jpg";

  return (
    <div className="card" style={{ width: "18rem" }}>
      <Toaster />
      <img src={imgPath} className="card-img-top img-card" alt="imagen" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="product-category">{categoryName}</p>
        <p className="card-text">${product.price}</p>
        <div className="cards-buttons">
          {/* Controles de cantidad */}
          {userRole === "Client" && (
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
          )}
          {userRole === "Client" && ( // Mostrar 'Comprar' si NO es Admin
            <button onClick={handleBuy} className="btn marron">
              Comprar
            </button>
          )}
          <div className="cards-admin-buttons">
            {/* Botones de Admin */}
            {(userRole === "Admin" || userRole === "Employee") && (
              <button
                className="btn update"
                onClick={() => navigate(`/updateProduct/${product.id}`)}
              >
                ✎
              </button>
            )}

            {(userRole === "Admin" || userRole === "Employee") && (
              <button
                className="btn btn-secondary"
                onClick={async () => {
                  const success = await DisableProduct({
                    id: product.id,
                    navigate,
                  });
                  // Usamos la prop setDisableProduct que ahora recibimos
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

export default Card;
