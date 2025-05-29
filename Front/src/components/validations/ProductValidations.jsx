//Corregir focus a como estaba antes. Así no es funcional

const ProductValidations = ({ datos, refs }) => {
  const errors = {}; //para manejar errores al enviar formulario. Si fuese en tiempo real se necesita useState
  const { nameRef, descriptionRef, categoryRef, priceRef, stockRef } = refs;

  if (!datos.name?.trim()) {
    errors.name = "El nombre es obligatorio";
    nameRef.current.focus();
  }

  if (!datos.category?.trim()) {
    errors.category = "La categoría es obligatoria";
    categoryRef.current.focus();
  }

  const price = parseFloat(datos.price);
  if (isNaN(price) || price < 0) {
    errors.price = "El precio debe ser un número válido y no negativo";
    priceRef.current.focus();
  }

  const stock = parseInt(datos.stock);
  if (isNaN(stock) || stock < 0) {
    errors.stock = "El stock debe ser un número válido y no negativo";
    stockRef.current.focus();
  }

  return errors;
};

export default ProductValidations;
