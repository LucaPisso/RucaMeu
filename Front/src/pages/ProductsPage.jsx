import Card from "../components/Card";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CardAddProduct from "../components/CardAddProduct";
import "./ProductsPage.css";
import Modal from "../components/Modal";
import UpdateCategory from "../components/UpdateCategory";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [disableProduct, setDisableProduct] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const userRole = localStorage.getItem("user_role");

  const handleCategoryChange = (categoryId) => {
    setSearchTerm("");
    setSelectedCategory(categoryId);
  };
  const handleSearchChange = (event) => {
    // Si se ingresa una búsqueda, reseteamos el filtro de categoría (a 0)
    setSelectedCategory(0);
    setSearchTerm(event.target.value);
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/GetAllCategories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Falló al obtener categorías");
      const response = await res.json();

      // Añadir la opción "Todas" (id: 0) al inicio de la lista
      setCategories([{ id: 0, name: "Todos los Productos" }, ...response]);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
      toast.error("Error al cargar las categorías.");
    }
  };

  const handleEditCategory = (categoryId) => {
    setEditingCategoryId(categoryId); // ⭐ Guarda el ID que se va a editar
    setIsModalOpen(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, [API_URL]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let urlres = `${API_URL}/AllEnableProducts`;

        if (searchTerm.trim() !== "") {
          urlres = `${API_URL}/GetByNameEnable/${searchTerm.trim()}`;
        } else if (selectedCategory !== 0) {
          urlres = `${API_URL}/AllEnableProductByCategory/${selectedCategory}`;
        }

        const res = await fetch(urlres, {
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
    if (API_URL) {
      fetchProducts();
    }

    setDisableProduct(false);
  }, [disableProduct, selectedCategory, API_URL, searchTerm]);

  return (
    <>
      <div className="page-header-wrapper">
        <input
          type="search"
          name="searchProduct"
          id="searchProduct"
          className="search-input"
          placeholder="Buscar Producto"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="main-container">
        <div className="filters-sidebar">
          <h2>FILTROS</h2>
          {categories.length > 0 ? (
            <ul className="category-list">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={
                    cat.id === selectedCategory ? "active-category" : ""
                  }
                >
                  {cat.name}

                  {cat.id !== 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que se dispare el handleCategoryChange de la <li>
                        setIsModalOpen(true);
                        handleEditCategory(cat.id);
                      }}
                    >
                      ✎
                    </button>
                  )}
                </li>
              ))}

              {(userRole === "Admin" || userRole === "Employee") && (
                <li>
                  <button onClick={() => navigate("/createCategory")}>
                    +Añadir Categoria
                  </button>
                </li>
              )}
            </ul>
          ) : (
            <p>Cargando categorías...</p>
          )}
        </div>

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

          {(userRole === "Admin" || userRole === "Employee") && (
            <CardAddProduct categories={categories} />
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Editar Categoría"
        >
          <UpdateCategory
            onCreationSuccess={() => {
              handleCloseModal();
            }}
            categoryId={editingCategoryId}
          />
        </Modal>
      )}
    </>
  );
};

export default ProductsPage;
