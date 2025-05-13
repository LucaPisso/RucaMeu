import express from "express";
import { PORT } from "./config.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js"; // product no products y los dos puntos (routes va afuera de src)
import { sequelize } from "./db.js";
import cors from "cors";

import "./models/Product.js";
import "./models/User.js";

const app = express();

try {
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173", // El puerto de tu frontend
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  app.listen(PORT);
  app.use(productRoutes);
  app.use(userRoutes);
  await sequelize.sync();

  console.log(`Server listening on port ${PORT}`);
} catch (error) {
  console.log(`There was an error on initialization`);
}
