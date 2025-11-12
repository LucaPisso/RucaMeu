import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardUser from "../components/CardUser";
import toast, { Toaster } from "react-hot-toast";
import CardAdmin from "../components/CardAdmin";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  const [roleChange, setRoleChange] = useState(false);
  const [showUsers, setShowUsers] = useState(true);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [disableProduct, setDisableProduct] = useState(false);
  const [enableProduct, setEnableProduct] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("RucaMeu-token");

  const handleButtonView = () => {
    setShowUsers((prevShowUsers) => !prevShowUsers);
  };

  const buttonText = showUsers ? "Mostrar productos" : "Mostrar usuarios";

  //GET USER
  useEffect(() => {
    const fetchUsers = async () => {
      try {
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!token) {
          navigate("/login");
          throw new Error("Inicia sesión primero");
        }

        const data = await fetch(`${API_URL}/AllProducts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!data.ok) toast.error("Falló al obtener productos");

        const response = await data.json();
        setProducts(response);
      } catch (error) {
        console.error("Error: " + error.message);
        toast.error("Error: " + error.message);
      }
    };
    // Solo hacemos el fetch de productos si showUsers es false
    if (!showUsers) {
      fetchProducts();
      setDeleteProduct(false);
      setDisableProduct(false);
      setEnableProduct(false);
    }
  }, [showUsers, deleteProduct, disableProduct, enableProduct]);

  return (
    <>
      <h3>AdminPanel</h3>
      <button onClick={handleButtonView}>{buttonText}</button>
      <div className="card-container">
        {showUsers ? (
          // MUESTRA USUARIOS
          users.length > 0 ? (
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
          )
        ) : // MUESTRA PRODUCTOS
        products.length > 0 ? (
          products.map((p) => (
            <CardAdmin
              key={p.id}
              product={p}
              setDeleteProduct={setDeleteProduct}
              setDisableProduct={setDisableProduct}
              setEnableProduct={setEnableProduct}
            />
          ))
        ) : (
          <p>No existen productos</p>
        )}
      </div>
    </>
  );
};

export default AdminPanel;
