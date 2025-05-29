const ProductValidations = ({ datos, refs }) => {
  const errors = {}; //para manejar errores al enviar formulario. Si fuese en tiempo real se necesita useState
  const { nameRef, descriptionRef, categoryRef, priceRef, stockRef } = refs;

  if (!datos.name?.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  if (!datos.category?.trim()) {
    errors.category = "La categoría es obligatoria";
  }

  const price = parseFloat(datos.price);
  if (isNaN(price) || price < 0) {
    errors.price = "El precio debe ser un número válido y no negativo";
  }

  const stock = parseInt(datos.stock);
  if (isNaN(stock) || stock < 0) {
    errors.stock = "El stock debe ser un número válido y no negativo";
  }

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

  return errors;
};

export default ProductValidations;
