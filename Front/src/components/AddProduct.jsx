import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import ProductValidations from "./validations/ProductValidations";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    description: "",
    price: "",
    category: 0,
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
  const refs = {
    nameRef,
    imageUrlRef,
    descriptionRef,
    priceRef,
    stockRef,
    categoryRef,
  };

  const token = localStorage.getItem("RucaMeu-token");
  const API_URL = import.meta.env.VITE_API_BASE_URL;

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

    if (!confirm("¿Estás seguro de que desea agregar este producto?")) {
      return;
    }
    const finalData = {
      Name: formData.name,
      Description: formData.description,
      Price: parseFloat(formData.price),
      Stock: parseInt(formData.stock, 10),
      CategoryId: parseInt(formData.category, 10),
      ImgUrl: formData.imageUrl,
    };

    try {
      if (!token) {
        navigate("/login");
        throw new Error("Token no encontrado. Inicie sesión primero.");
      }

      const res = await fetch(`${API_URL}/CreateProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Error desconocido al agregar producto"
        );
      }
      toast.success("Producto agregado correctamente");
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
      toast.error("Error: " + error.message);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="register-form">
      <h2 className="register-title">Agregar producto</h2>
      <button
        type="buttonback"
        onClick={handleGoBack}
        className="btn btn-secondary back-button"
      >
        ← Volver
      </button>
      <form onSubmit={submitHandler} action="POST">
        <label htmlFor="imageUrl">Imagen</label>

        <input
          className="register-input"
          type="text"
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
          type="number"
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
          Agregar
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
