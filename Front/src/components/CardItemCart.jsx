import { useState } from "react";
import toast from "react-hot-toast";
import DeleteIcon from "./icons/DeleteIcon";

const images = import.meta.glob("../assets/products/*.jpg", { eager: true });
const API_URL = import.meta.env.VITE_API_BASE_URL;

const CardItemCart = ({ item, onUpdateCart, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const product = item.productDTO;
  const subtotal = item.subtotal; // Subtotal ya no se muestra en este diseño, pero se usa internamente
  const token = localStorage.getItem("RucaMeu-token");
  const availableStock = product.stock; // Lógica para obtener la imagen (sin cambios)

  const imageKey = `../assets/products/${product.imgUrl}.jpg`;
  const imgModule = images[imageKey];
  const imgPath = imgModule ? imgModule.default : "/placeholder.jpg"; // ... (Tu función modifyQuantity actual va aquí, sin cambios) ...

  const modifyQuantity = async (action) => {
    if (!token) return toast.error("Se requiere autenticación.");
    const productId = product.id;
    const endpoint =
      action === "increment" ? "/IncrementItemCart" : "/DecreaseItemCart";

    if (action === "increment" && quantity == availableStock) {
      toast.error(`Stock máximo alcanzado (${availableStock}).`);
      return;
    }

    try {
      const res = await fetch(`${API_URL}${endpoint}?productId=${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Error al actualizar la cantidad."
        );
      }

      const newQuantity = action === "increment" ? quantity + 1 : quantity - 1;
      setQuantity(newQuantity);
      onUpdateCart();
      toast.success(`Cantidad de ${product.name} actualizada.`);
    } catch (err) {
      console.error(err);
      toast.error("❌ " + err.message);
      onUpdateCart();
    }
  };

  return (
    <div className="cart-item-baggy-card">
      <div className="cart-item-image-baggy">
        <img src={imgPath} alt={product.name} />
      </div>
      <div className="cart-item-details-baggy">
        <div className="item-header-row">
          <h3 className="product-name-baggy">{product.name}</h3>

          <button
            className="btn-delete-baggy"
            onClick={() => onRemove(product.id)}
          >
            <DeleteIcon
              style={{ width: "40px", height: "40px", stroke: "currentColor" }}
            />
          </button>
        </div>
        <span className="product-unit-price-label">
          Precio unitario: ${product.price.toFixed(2)}
        </span>

        <div className="quantity-controls-baggy">
          <button onClick={() => modifyQuantity("decrease")}>−</button>
          <span className="quantity-value-baggy">{quantity}</span>
          <button
            onClick={() => modifyQuantity("increment")}
            disabled={quantity == availableStock}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItemCart;
