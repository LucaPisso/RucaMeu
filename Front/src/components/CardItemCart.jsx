const CardItemCart = ({ item }) => {
  // item es: { cartId: 17, productDTO: {...}, quantity: 2, subtotal: 3000 }

  const product = item.productDTO;
  const quantity = item.quantity;
  const subtotal = item.subtotal;

  return (
    <div className="card">
      <h2>{product.name}</h2>
      <p>Precio Unitario: ${product.price}</p>
      <p>Cantidad: {quantity}</p> {/* 👈 Datos del carrito */}
      <p>Subtotal: ${subtotal}</p> {/* 👈 Datos del carrito */}
      {/* Aquí pondrías botones para modificar la cantidad o eliminar el ítem */}
    </div>
  );
};

export default CardItemCart;
