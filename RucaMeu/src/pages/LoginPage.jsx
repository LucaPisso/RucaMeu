import Login from "../components/Login";
import Validations from "../components/Validations";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

function LoginPage() {
  //ESTADOS Y USEREF
  const [errors, setErrors] = useState({});
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const checkErrors = (formData) => {
    const errors = Validations({ datos: formData });

    if (Object.keys(errors).length > 0) {
      if (errors.email && emailRef.current) {
        emailRef.current.focus();
      } else if (errors.password && passwordRef.current) {
        passwordRef.current.focus();
      }
      setErrors(errors);
    } else {
      setErrors({});
      navigate("/");
    }
  };
  return (
    <>
      <Login
        submit={checkErrors}
        errors={errors}
        refs={{
          emailRef,
          passwordRef,
        }}
      />
    </>
  );
}

export default RegisterPage;
