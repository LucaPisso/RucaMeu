import Register from "../components/Register";
import UserValidations from "../components/validations/UserValidations";
import { useRef, useState } from "react";

function RegisterPage() {
  //ESTADOS Y USEREF
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const checkErrors = (formData) => {
    const errors = UserValidations({ datos: formData });

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
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
      return false;
    } else {
      setErrors({});
      return true;
    }
  };
  return (
    <>
      <Register
        checkErrors={checkErrors}
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
