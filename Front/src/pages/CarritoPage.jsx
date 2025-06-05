import Card from "../components/Card";
import { useEffect, useState } from "react";

const CarritoPage = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const token = localStorage.getItem("RucaMeu-token");
        const res = await fetch("http://localhost:3000/carrito", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Falló al obtener productos");
        const response = await res.json();
        setCarrito(response.carrito);
        console.log(response.carrito);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCarrito();
  }, []);

  return (
    <>
      <h1>Productos</h1>
      <div className="card-container">
        {carrito.length > 0 ? (
          carrito.map((c) => <Card key={c.id} carrito={c} />)
        ) : (
          <p>No hay productos disponibles.</p>
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
