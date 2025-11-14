import { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardUser from "../components/CardUser";
import toast, { Toaster } from "react-hot-toast";
import CardAdmin from "../components/CardAdmin";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  const [roleChange, setRoleChange] = useState(false);
  const [showUsers, setShowUsers] = useState(true);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [disableProduct, setDisableProduct] = useState(false);
  const [enableProduct, setEnableProduct] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("RucaMeu-token");

  const handleButtonView = () => {
    setShowUsers((prevShowUsers) => !prevShowUsers);
  };

  const handleSearchChange = (event) => {
    setSearchProduct(event.target.value);
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

        if (!res.ok) {
          toast.error("Falló al obtener usuarios");
          return;
        }

        const response = await res.json();
        setUsers(response);
      } catch (error) {
        alert("Error: " + error.message);
      }
    };
    fetchUsers();
    setRoleChange(false);
    setDeleteUser(true);
  }, [deleteUser, roleChange]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!token) {
          navigate("/login");
          throw new Error("Inicia sesión primero");
        }

        let urlProduct = `${API_URL}/AllProducts`;

        if (searchProduct.trim() !== "") {
          urlProduct = `${API_URL}/GetByName/${searchProduct.trim()}`;
        }

        const data = await fetch(urlProduct, {
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
  }, [showUsers, deleteProduct, disableProduct, enableProduct, searchProduct]);

  return (
    <>
      {/* Contenedor principal para los controles de administración */}
      <div className="admin-controls-wrapper">
        {/* Botón de alternar vista */}
        <button
          onClick={handleButtonView}
          className="admin-btn admin-btn-toggle"
        >
          {buttonText}
        </button>

        {/* Enlace y botón para crear empleado */}
        <Link to="/createEmployee">
          <button className="admin-btn admin-btn-create admin-btn-employee">
            Crear empleado
          </button>
        </Link>

        {/* Enlace y botón para crear administrador */}
        <Link to="/createAdmin">
          <button className="admin-btn admin-btn-create admin-btn-admin">
            Crear administrador
          </button>
        </Link>

        {/* Campo de búsqueda, solo visible si NO se muestran usuarios */}
        {!showUsers && (
          <input
            type="search"
            name="searchProduct"
            id="searchProduct"
            className="admin-search-input"
            placeholder="Buscar producto"
            value={searchProduct}
            onChange={handleSearchChange}
          />
        )}
      </div>{" "}
      {/* Cierre de admin-controls-wrapper */}
      {/* Contenedor de la lista de tarjetas (Usuarios o Productos) */}
      <div className="admin-card-list-container">
        {showUsers ? (
          // MUESTRA USUARIOS
          users.length > 0 ? (
            users.map((u) => (
              <CardUser
                key={u.id}
                user={u}
                setDeleteUser={setDeleteUser}
                setRoleChange={setRoleChange}
                // Si CardUser es un <div> principal, puedes añadir: cardClassName="admin-user-card"
              />
            ))
          ) : (
            <p className="admin-message-empty">No existen usuarios</p>
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
              // Si CardAdmin es un <div> principal, puedes añadir: cardClassName="admin-product-card"
            />
          ))
        ) : (
          <p className="admin-message-empty">No existen productos</p>
        )}
      </div>
    </>
  );
};

export default AdminPanel;
