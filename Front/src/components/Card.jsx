// src/components/Card.jsx
import { useNavigate } from "react-router-dom";
import DisableProduct from "./DisableProduct";
import DeleteProduct from "./ProductDelete";
import toast, { Toaster } from "react-hot-toast";
// Asegúrate de que DeleteProduct/DisableProduct estén disponibles si los usas
// en la vista pública (si el Admin visita la ProductPage)

const images = import.meta.glob("../assets/products/*.jpg", { eager: true });

const Card = ({ product, setDisableProduct }) => {
  const userRole = localStorage.getItem("user_role");
  const navigate = useNavigate();

  const imageKey = `../assets/products/${product.imgUrl}.jpg`;
  const imgModule = images[imageKey];
  const imgPath = imgModule ? imgModule.default : "/placeholder.jpg";

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={imgPath} className="card-img-top img-card" alt="imagen" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <div className="cards-buttons">
          {userRole !== "Admin" && ( // Mostrar 'Comprar' si NO es Admin
            <button
              onClick={async () => {
                toast.error("Servicio no disponible");
                // ... tu lógica de agregar al carrito
              }}
              className="btn marron"
            >
              Comprar
            </button>
          )}

          <div className="cards-admin-buttons">
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

export default Card;
