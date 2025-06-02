import { useNavigate } from "react-router-dom";
import imagen1 from "../assets/products/fanal-gris.jpg";
import DeleteProduct from "./DeleteProduct";

const Card = ({ product, setDeleteProduct }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  //FETCH EDITAR PRODUCTO

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={product.imageUrl || imagen1} //imagen1 porque todavía no tenemos imágenes en la bd
        className="card-img-top img-card"
        alt="imagen"
      />
      {/*img-card esta en app.css, pude sobreescribir la de bootstrap*/}
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.price}</p>
        <button
          onClick={async () => {
            try {
              const token = localStorage.getItem("RucaMeu-token");

              const res = await fetch(
                `http://localhost:3000/carrito/${product.id}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ cantidad: 1 }),
                }
              );

              const data = await res.json();

              if (!res.ok) {
                throw new Error(data.message || "Error al agregar al carrito");
              }

              alert("✅ Producto agregado al carrito");
            } catch (err) {
              alert("❌ No se pudo agregar al carrito");
              console.error(err);
            }
          }}
          className="btn"
        >
          Comprar
        </button>
        {user?.role === "admin" && (
          <button
            onClick={() => {
              navigate(`/updateProduct/${product.id}`);
            }}
          >
            ✎
          </button>
        )}
        {user?.role === "admin" && (
          <button
            onClick={() => {
              setDeleteProduct(DeleteProduct({ id: product.id, navigate }));
            }}
          >
            🗑
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
