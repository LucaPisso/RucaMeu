const ProductValidations = ({ datos, refs }) => {
  const errors = {}; //para manejar errores al enviar formulario. Si fuese en tiempo real se necesita useState
  const { nameRef, descriptionRef, categoryRef, priceRef, stockRef } = refs;

  if (!datos.name?.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  if (!datos.category?.trim()) {
    errors.category = "La categoría es obligatoria";
  }

  if (!datos.price && datos.price !== 0) {
    errors.price = "el precio es obligatorio";
  }

  if (!datos.stock && datos.stock !== 0) {
    errors.stock = "Este campo es obligatorio";
  }

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
    //errors = {}; no hace falta
    return true;
  }
};

export default ProductValidations;
