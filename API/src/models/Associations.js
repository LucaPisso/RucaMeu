import { User } from "./User.js";
import { Product } from "./Product.js";
import { Carrito } from "./Carrito.js";
import { CarritoProduct } from "./CarritoProduct.js";

// User - Carrito (1:1)
User.hasOne(Carrito, { foreignKey: "userId" });
Carrito.belongsTo(User, { foreignKey: "userId" });

// Carrito - Product (N:M)
Carrito.belongsToMany(Product, {
  through: CarritoProduct,
  foreignKey: "carritoId", // Debe coincidir con el campo en CarritoProduct
  otherKey: "productId",
});

Product.belongsToMany(Carrito, {
  through: CarritoProduct,
  foreignKey: "productId", // Debe coincidir con el campo en CarritoProduct
  otherKey: "carritoId",
});
