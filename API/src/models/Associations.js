import { User } from "./User.js";
import { Carrito } from "./Carrito.js";
import { Product } from "./Product.js";

// 1:1 entre Usuario y Carrito
User.hasOne(Carrito, { foreignKey: "userId" });
Carrito.belongsTo(User, { foreignKey: "userId" });

// 1:N entre Carrito y Productos
Carrito.hasMany(Product, { foreignKey: "carritoId" });
Product.belongsTo(Carrito, { foreignKey: "carritoId" });
