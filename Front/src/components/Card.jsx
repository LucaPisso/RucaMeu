import imagen1 from "../assets/fanal-madera.jpg";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
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
        <button onClick={() => {}} className="btn">
          Comprar
        </button>
        {user?.role === "admin" && (
          <button
            onClick={() => {
              navigate(`/updateProduct/${product.id}`);
            }}
          >
            Editar✎
          </button>
        )}
        {user?.role === "admin" && (
          <button onClick={() => alert(`Usted va a eliminar ${product.name}`)}>
            Eliminar🗑
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
