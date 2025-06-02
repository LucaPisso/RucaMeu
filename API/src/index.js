import express from "express";
import { PORT } from "./config.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";
import { sequelize } from "./db.js";
import cors from "cors";

import "./models/Product.js";
import "./models/User.js";
import "./models/Carrito.js";
import "./models/CarritoProduct.js";

import "./models/Associations.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(productRoutes);
app.use(userRoutes);
app.use(carritoRoutes);

// 🔁 Sincronizar y arrancar el servidor
const startServer = async () => {
  try {
    await sequelize.sync({ force: false }); // usa `force: true` si querés resetear las tablas
    console.log("Base de datos sincronizada");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
  }
};

startServer();
