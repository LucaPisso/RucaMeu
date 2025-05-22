import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const ProductsPage = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        if (!res.ok) throw new Error("Error al cargar los productos");

        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los productos.");
      }
    };

    fetchProductos();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Productos</h1>
      {error && <p>{error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {productos.map((Product) => (
          <Card key={Product.id} nombre={Product.name} precio={Product.price} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
