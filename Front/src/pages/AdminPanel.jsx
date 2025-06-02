import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardUser from "../components/CardUser";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  const navigate = useNavigate();

  //GET USER
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("RucaMeu-token");
        if (!token) {
          navigate("/login");
          throw new Error("Inicia sesión primero");
        }

        const res = await fetch(`http://localhost:3000/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Status de respuesta:", res.status);

        if (!res.ok) throw new Error("Falló al obtener productos");

        const response = await res.json();
        setUsers(response.users);
        console.log(response.users);
        console.log("respuesta del backend:", response);
      } catch (error) {
        console.log(error.message);
        alert("Error: " + error.message);
      }
    };
    fetchUsers();
    setDeleteUser(false);
  }, [deleteUser]);
  return (
    <>
      <h3>AdminPanel</h3>
      <div className="card-container">
        {users.length > 0 ? (
          users.map((u) => (
            <CardUser key={u.id} user={u} setDeleteUser={setDeleteUser} />
          ))
        ) : (
          <p>No existen usuarios</p>
        )}
      </div>
    </>
  );
};

export default AdminPanel;
