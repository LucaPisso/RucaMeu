import { useNavigate } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";
import toast, { Toaster } from "react-hot-toast";
const images = import.meta.glob("../assets/products/*.jpg", { eager: true });

const Card = ({ product, setDeleteProduct }) => {
  const token = localStorage.getItem("RucaMeu-token");
  const userRole = localStorage.getItem("user_role");
  const navigate = useNavigate();

  // const IMG_URL = import.meta.env.VITE_IMG_URL;
  // const img = `${IMG_URL}${product.imgUrl}.jpg`;
  // console.log(img);
  const imageKey = `../assets/products/${product.imgUrl}.jpg`;
  const imgModule = images[imageKey];
  const imgPath = imgModule ? imgModule.default : "/placeholder.jpg";

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={imgPath} className="card-img-top img-card" alt="imagen" />
      {/*img-card esta en app.css, pude sobreescribir la de bootstrap*/}
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <div className="cards-buttons">
          <button
            onClick={async () => {
              toast.error("Servicio no disponible");
              /*try {
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
                    throw new Error(
                      data.message || "Error al agregar al carrito"
                    );
                  }

                  toast.success("✅ Producto agregado al carrito");
                } catch (err) {
                  toast.error("❌ Tenes que registrarte para comprar.");
                  navigate("/register");
                  console.error(err);
                }*/
            }}
            className="btn marron"
          >
            Comprar
          </button>
          <div className="cards-admin-buttons">
            {userRole === "Admin" && (
              <button
                className="btn update"
                onClick={() => {
                  navigate(`/updateProduct/${product.id}`);
                }}
              >
                ✎
              </button>
            )}
            {userRole === "Admin" && (
              <button
                className="btn delete"
                onClick={() => {
                  setDeleteProduct(DeleteProduct({ id: product.id, navigate }));
                }}
              >
                🗑
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
