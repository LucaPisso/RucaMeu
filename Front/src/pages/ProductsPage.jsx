import Card from "../components/Card";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CardAddProduct from "../components/CardAddProduct";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [disableProduct, setDisableProduct] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const userRole = localStorage.getItem("user_role");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
    setDisableProduct(false);
  }, [disableProduct]);

  return (
    <>
      <h1 className="title-page">Productos</h1>
      <div className="card-container">
        {products.length > 0 ? (
          products.map((p) => (
            <Card
              key={p.id}
              product={p}
              setDisableProduct={setDisableProduct}
            />
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
        {userRole === "Admin" ||
          (userRole === "Employee" && <CardAddProduct />)}
      </div>
    </>
  );
};

export default ProductsPage;
