import Card from "../components/Card";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Falló al obtener productos");
        const response = await res.json();
        setProducts(response.products);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>HomePage</h1>
      <div className="card-container">
        {products.length > 0 ? (
          products.map((p) => <Card key={p.id} product={p} />)
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

export default HomePage;
