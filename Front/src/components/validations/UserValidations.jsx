const UserValidations = ({ datos, refs }) => {
  const errors = {};
  const {
    nameRef,
    lastNameRef,
    phoneRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
  } = refs;
  //REGEXS
  const fullNameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const phoneRegex = /^[0-9]{9,12}$/;
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if ("name" in datos) {
    if (!datos.name?.trim()) {
      errors.name = "El nombre es obligatorio";
    } else if (datos.name.trim().length < 3) {
      errors.name = "El nombre debe tener minimo 3 letras";
    } else if (!fullNameRegex.test(datos.name)) {
      errors.name = "No se permiten caracteres especiales ni números";
    }
  }

  if ("lastName" in datos) {
    if (!datos.lastName?.trim()) {
      errors.lastName = "El apellido es obligatorio";
    } else if (datos.lastName.trim().length < 3) {
      errors.lastName = "El apellido debe tener minimo 3 letras";
    } else if (!fullNameRegex.test(datos.lastName)) {
      errors.lastName = "No se permiten caracteres especiales ni números";
    }
  }

  if ("phoneNumber" in datos) {
    if (!datos.phoneNumber?.trim()) {
      errors.phone = "El teléfono es obligatorio";
    } else {
      // 💡 CORRECCIÓN 1: Limpiamos el string de todo lo que no sea dígito
      const cleanPhone = datos.phoneNumber.replace(/\D/g, "");

      if (!phoneRegex.test(cleanPhone)) {
        // 💡 CORRECCIÓN 2: Usar errors.phone para que se muestre el mensaje en el JSX
        errors.phone =
          "El teléfono no es válido (debe tener entre 9 y 12 dígitos)";
      }
    }
  }

  if ("email" in datos) {
    if (!datos.email?.trim()) {
      errors.email = "El email es obligatorio";
    } else if (!emailRegex.test(datos.email)) {
      errors.email = "El email no es válido";
    }
  }

  if ("password" in datos) {
    if (!datos.password?.trim()) {
      // ⬅️ AHORA: Si existe, pero está vacío, el error ES OBLIGATORIO.
      errors.password = "La contraseña es obligatoria";
    } else if (!passwordRegex.test(datos.password)) {
      // ⬅️ Si tiene algo, se valida el formato.
      errors.password = "Mínimo 8 caracteres, incluyendo letras y números";
    }
  }

  if ("confirmPassword" in datos) {
    if (!datos.confirmPassword?.trim()) {
      errors.confirmPassword = "Este campo es obligatorio";
    } else if (datos.password !== datos.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
  }

  if (errors.name && nameRef?.current) {
    nameRef.current.focus();
  } else if (errors.lastName && lastNameRef?.current) {
    lastNameRef.current.focus();
  } else if (errors.phone && phoneRef?.current) {
    phoneRef.current.focus();
  } else if (errors.email && emailRef?.current) {
    emailRef.current.focus();
  } else if (errors.password && passwordRef?.current) {
    passwordRef.current.focus();
  } else if (errors.confirmPassword && confirmPasswordRef?.current) {
    confirmPasswordRef.current.focus();
  }

  return errors;
};

export default UserValidations;
