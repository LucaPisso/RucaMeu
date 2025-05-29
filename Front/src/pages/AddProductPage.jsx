import AddProduct from "../components/AddProduct";
import ProductValidations from "../components/validations/ProductValidations";
import { useRef, useState } from "react";
// import { useNavigate } from "react-router";

function AddProductPage() {
  //ESTADOS Y USEREF
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const stockRef = useRef(null);
  const categoryRef = useRef(null);
  // const navigate = useNavigate();

  const checkErrors = (formData) => {
    const errors = ProductValidations({ datos: formData });

    if (Object.keys(errors).length > 0) {
      if (errors.name && nameRef.current) {
        nameRef.current.focus();
      } else if (errors.description && descriptionRef.current) {
        descriptionRef.current.focus();
      } else if (errors.category && categoryRef.current) {
        categoryRef.current.focus();
      } else if (errors.price && priceRef.current) {
        priceRef.current.focus();
      } else if (errors.stock && stockRef.current) {
        stockRef.current.focus();
      }
      return false;
    } else {
      // alert("Producto agregado correctamente.");
      setErrors({});
      // navigate("/");
      return true;
    }
  };
  return (
    <>
      <AddProduct
        checkErrors={checkErrors}
        errors={errors}
        refs={{
          nameRef,
          descriptionRef,
          categoryRef,
          priceRef,
          stockRef,
        }}
      />
    </>
  );
}

export default AddProductPage;
