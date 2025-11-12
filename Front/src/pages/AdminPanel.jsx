import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardUser from "../components/CardUser";
import toast, { Toaster } from "react-hot-toast";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  const [roleChange, setRoleChange] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  //GET USER
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("RucaMeu-token");
        if (!token) {
          navigate("/login");
          throw new Error("Inicia sesión primero");
        }

        const res = await fetch(`${API_URL}/GetAllUsers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Falló al obtener productos");

        const response = await res.json();
        setUsers(response);
      } catch (error) {
        alert("Error: " + error.message);
      }
    };
    fetchUsers();
    setRoleChange(false);
    setDeleteUser(false);
  }, [deleteUser, roleChange]);

  return (
    <>
      <h3>AdminPanel</h3>
      <div className="card-container">
        {users.length > 0 ? (
          users.map((u) => (
            <CardUser
              key={u.id}
              user={u}
              setDeleteUser={setDeleteUser}
              setRoleChange={setRoleChange}
            />
          ))
        ) : (
          <p>No existen usuarios</p>
        )}
      </div>
    </>
  );
};

export default AdminPanel;
