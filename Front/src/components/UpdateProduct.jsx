import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

import ProductValidations from "./validations/ProductValidations";

const UpdateProduct = () => {
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [errors, setErrors] = useState({});
  const imageUrlRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const stockRef = useRef(null);
  const categoryRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const refs = {
    nameRef,
    imageUrlRef,
    descriptionRef,
    priceRef,
    stockRef,
    categoryRef,
  };

  //Get product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("RucaMeu-token");

        if (!token) {
          navigate("/login");
          throw new Error("Token no encontrado. Inicie sesión primero.");
        }

        const res = await fetch(`http://localhost:3000/products/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "Error desconocido al buscar un producto"
          );
        }

        const data = await res.json();
        console.log(data.product);
        setFormData(data.product);
      } catch (error) {
        console.log(error.message);
        toast.error("Error: " + error.message);
      }
    };

    fetchProduct();
  }, []);
  //

  //Maneja constantemente los cambios de los inputs
  function changeHandler(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const newErrors = ProductValidations({ datos: formData, refs }); // Hay que crear una variable extra, ya que el estado no se actualiza instantáneamente
    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) {
      console.warn("Formulario inválido. No se enviará.");
      return;
    }

    if (!confirm("¿Estás seguro de que desea actualizar este producto?")) {
      return;
    }

    try {
      const token = localStorage.getItem("RucaMeu-token");
      if (!token) {
        navigate("/login");
        throw new Error("Token no encontrado. Inicie sesión primero.");
      }

      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Error desconocido al actualizar producto"
        );
      }
      toast.success("Producto actualizado correctamente");
      const data = await res.json();
      console.log(`Producto actualizado: ${data.product}`);
      setFormData({
        imageUrl: "",
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
      });
      navigate("/products");
    } catch (error) {
      console.log(error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="register-form">
      <h2 className="register-title">Editando producto</h2>
      <form onSubmit={submitHandler} action="POST">
        <label htmlFor="imageUrl">Imagen</label>

        <input
          className="register-input"
          type="url"
          name="imageUrl"
          placeholder="Imagen"
          onChange={changeHandler}
          value={formData.imageUrl}
          ref={imageUrlRef}
        />
        {errors.imageUrl && <p style={{ color: "red" }}>{errors.imageUrl}</p>}

        <label htmlFor="name">Nombre del Producto:</label>

        <input
          className="register-input"
          type="text"
          name="name"
          placeholder="Nombre del Producto"
          onChange={changeHandler}
          value={formData.name}
          ref={nameRef}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <label htmlFor="description">Descripción:</label>

        <input
          className="register-input"
          type="text"
          name="description"
          placeholder="Descripción"
          onChange={changeHandler}
          value={formData.description}
          ref={descriptionRef}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description}</p>
        )}

        <label htmlFor="category">Categoria:</label>

        <input
          className="register-input"
          type="text"
          name="category"
          placeholder="Categoría"
          onChange={changeHandler}
          value={formData.category}
          ref={categoryRef}
        />
        {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}

        <label htmlFor="price">Precio:</label>

        <input
          className="register-input"
          type="number"
          step="0.01"
          name="price"
          placeholder="Precio"
          onChange={changeHandler}
          value={formData.price}
          ref={priceRef}
        />
        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}

        <label htmlFor="stock">Stock:</label>

        <input
          className="register-input"
          type="number"
          name="stock"
          onChange={changeHandler}
          value={formData.stock}
          ref={stockRef}
        />
        {errors.stock && <p style={{ color: "red" }}>{errors.stock}</p>}

        <button type="submit" className="register-button">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
