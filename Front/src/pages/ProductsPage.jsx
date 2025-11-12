import Card from "../components/Card";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //"https://localhost:7121/AllEnableProducts"
        const API_URL = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${API_URL}/AllEnableProducts`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Falló al obtener productos");
        const response = await res.json();
        setProducts(response);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
    setDeleteProduct(false);
  }, [deleteProduct]);

  const userRole = localStorage.getItem("user_role");

  return (
    <>
      <h1 className="title-page">Productos</h1>
      <div className="card-container">
        {products.length > 0 ? (
          products.map((p) => (
            <Card key={p.id} product={p} setDeleteProduct={setDeleteProduct} />
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
      {userRole === "Admin" && (
        <button onClick={() => navigate("/addProduct")} className="btn marron">
          Agregar producto
        </button>
      )}
    </>
  );
};

export default ProductsPage;
