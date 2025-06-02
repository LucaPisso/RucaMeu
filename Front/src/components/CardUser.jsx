import { useNavigate } from "react-router-dom";
import DeleteUser from "./DeleteUser";

const CardUser = ({ user, setDeleteUser }) => {
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

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
              navigate(`/updateUser/${user.id}`);
            }}
          >
            Editar
          </button>
        )}
        {userLocalStorage?.role === "admin" && (
          <button
            onClick={() => {
              setDeleteUser(DeleteUser({ id: user.id, navigate }));
            }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default CardUser;
