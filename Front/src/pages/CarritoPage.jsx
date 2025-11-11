import Card from "../components/Card";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);

  const token = localStorage.getItem("RucaMeu-token");
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const res = await fetch(`${API_URL}/GetCartByToken`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Falló al obtener productos");
        const response = await res.json();
        setCarrito(response);
        console.log(response);
      } catch (err) {
        console.error(err);
        toast.error("Error: " + err.message);
      }
    };

    fetchCarrito();
  }, []);

  return (
    <>
      <h1>Mi carrito</h1>
      <div className="card-container">
        {carrito.length > 0 ? (
          carrito.map((c) => <Card key={c.id} carrito={c} />)
        ) : (
          <h1>No hay productos en el carrito.</h1>
        )}
      </div>

      {/* const filteredBooks = books
            .filter(product => search ? (book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase())) : book)
            .map(((product) => (
              <BookItem
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                rating={book.rating}
                pages={book.pageCount}
                imageUrl={book.imageUrl}
                summary={book.summary}
                available={book.available}
                onDeleteBook={handleDeleteBook}
              />
            )));
            </> */}
    </>
  );
};

export default CarritoPage;
