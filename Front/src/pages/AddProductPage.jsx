import AddProduct from "../components/AddProduct";
import Validations from "../components/Validations";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

function AddProductPage() {
  //ESTADOS Y USEREF
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const stockRef = useRef(null);
  const navigate = useNavigate();

  const checkErrors = (formData) => {
    const errors = Validations({ datos: formData });

    if (Object.keys(errors).length > 0) {
      if (errors.name && nameRef.current) {
        nameRef.current.focus();
      } else if (errors.description && descriptionRef.current) {
        descriptionRef.current.focus();
      } else if (errors.price && priceRef.current) {
        priceRef.current.focus();
      } else if (errors.stock && stockRef.current) {
        stockRef.current.focus();
      }
      setErrors(errors);
    } else {
      alert("Formulario enviado con éxito");
      setErrors({});
      navigate("/");
    }
    console.log(formData);
    console.log(nameRef);
  };
  return (
    <>
      <AddProduct
        submit={checkErrors}
        errors={errors}
        refs={{
          nameRef,
          descriptionRef,
          priceRef,
          stockRef,
        }}
      />
    </>
  );
}

export default AddProductPage;
