import Register from "../components/Register";
import UserValidations from "../components/UserValidations";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

function RegisterPage() {
  //ESTADOS Y USEREF
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();

  const checkErrors = (formData) => {
    const errors = UserValidations({ datos: formData });

    if (Object.keys(errors).length > 0) {
      if (errors.name && nameRef.current) {
        nameRef.current.focus();
      } else if (errors.lastName && lastNameRef.current) {
        lastNameRef.current.focus();
      } else if (errors.phone && phoneRef.current) {
        phoneRef.current.focus();
      } else if (errors.email && emailRef.current) {
        emailRef.current.focus();
      } else if (errors.password && passwordRef.current) {
        passwordRef.current.focus();
      } else if (errors.confirmPassword && confirmPasswordRef.current) {
        confirmPasswordRef.current.focus();
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
      <Register
        submit={checkErrors}
        errors={errors}
        refs={{
          nameRef,
          lastNameRef,
          phoneRef,
          emailRef,
          passwordRef,
          confirmPasswordRef,
        }}
      />
    </>
  );
}

export default RegisterPage;
