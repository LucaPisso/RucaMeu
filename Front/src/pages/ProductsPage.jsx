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
        const res = await fetch("http://localhost:3000/products", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Falló al obtener productos");
        const response = await res.json();
        setProducts(response.products);
        console.log(response.products);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
    setDeleteProduct(false);
  }, [deleteProduct]);

  return (
    <>
      <h1>Productos</h1>
      <div className="card-container">
        {products.length > 0 ? (
          products.map((p) => (
            <Card key={p.id} product={p} setDeleteProduct={setDeleteProduct} />
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
      <button onClick={() => navigate("/addProduct")} className="btn marron">
        Agregar producto
      </button>

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

export default ProductsPage;
