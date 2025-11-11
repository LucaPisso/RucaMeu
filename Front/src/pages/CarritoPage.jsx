import Card from "../components/Card";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CardItemCart from "../components/CardItemCart";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const token = localStorage.getItem("RucaMeu-token");
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        if (!token) {
          toast.error("Debes iniciar sesión para ver el carrito");
          navigate("/login");
        }
        const res = await fetch(`${API_URL}/GetCartByToken`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Falló al obtener productos");
        const response = await res.json();
        setCarrito(response.items);
        setTotalPrice(response.totalPrice);
        console.log(response.items);
      } catch (err) {
        console.error(err);
        toast.error("Error: " + err.message);
      }
    };

    fetchCarrito();
  }, [token, API_URL]);

  return (
    <>
      <h1>Mi carrito</h1>
      <div className="card-container">
        <h2>Total: ${totalPrice}</h2>
        {carrito.length > 0 ? (
          carrito.map((item) => (
            <CardItemCart key={item.productDTO.id} item={item} />
          ))
        ) : (
          <h1>No hay productos en el carrito.</h1>
        )}
      </div>
    </>
  );
};

export default CarritoPage;
