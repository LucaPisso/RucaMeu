import express from "express";
import { PORT } from "./config.js";
import productRoutes from "../routes/product.routes.js"; // product no products y los dos puntos (routes va afuera de src)
import { sequelize } from "./db.js";

import "./models/Product.js";

const app = express();

try {
  app.listen(PORT);
  app.use(productRoutes);

  await sequelize.sync();

  console.log(`Server listening on port ${PORT}`);
} catch (error) {
  console.log(`There was an error on initialization`);
}
