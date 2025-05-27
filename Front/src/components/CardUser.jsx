//import { useNavigate } from "react-router-dom";

const CardUser = ({ user }) => {
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  //const navigate = useNavigate();

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {user.name} {user.lastName}
        </h5>
        <p className="card-text">{user.phone}</p>
        <button onClick={() => {}} className="btn">
          Editar
        </button>
        {userLocalStorage?.role === "admin" && (
          <button
            onClick={() => {
              //   navigate(`/updateProduct/${user.id}`);
              alert(`Usted va a editar a ${user.name}`);
            }}
          >
            Borrar
          </button>
        )}
        {userLocalStorage?.role === "admin" && (
          <button onClick={() => alert(`Usted va a eliminar ${user.name}`)}>
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default CardUser;
