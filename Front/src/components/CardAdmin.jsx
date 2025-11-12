// src/components/CardAdmin.jsx
import { useNavigate } from "react-router-dom";
import DisableProduct from "./DisableProduct";
import EnableProduct from "./EnableProduct";
import ProductDelete from "./ProductDelete";
import toast, { Toaster } from "react-hot-toast";

const images = import.meta.glob("../assets/products/*.jpg", { eager: true });

const CardAdmin = ({
  product,
  setDeleteProduct,
  setDisableProduct,
  setEnableProduct,
}) => {
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

        {/* 🎯 Mostrar siempre el estado */}
        <p className="card-text">Estado: {product.enable ? "✅" : "❌"}</p>

        <div className="cards-buttons">
          <div className="cards-admin-buttons">
            {/* 🎯 Botón de Editar */}
            <button
              className="btn update"
              onClick={() => navigate(`/updateProduct/${product.id}`)}
            >
              ✎
            </button>

            {/* 🎯 Botón de Activar o Desactivar(Candado) */}
            {product.enable ? (
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
                🔓
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={async () => {
                  const success = await EnableProduct({
                    id: product.id,
                    navigate,
                  });
                  setEnableProduct(success);
                }}
              >
                🔒
              </button>
            )}
            {/* 🎯 Botón de ELIMINAR (Papelera) */}
            <button
              className="btn delete"
              onClick={async () => {
                const success = await ProductDelete({
                  id: product.id,
                  navigate,
                });
                setDeleteProduct(success);
              }}
            >
              🗑
            </button>
          </div>
        </div>
      </div>
      {/* <Toaster /> si es necesario */}
    </div>
  );
};

export default CardAdmin;
