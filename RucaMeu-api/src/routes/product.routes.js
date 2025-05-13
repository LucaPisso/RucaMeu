import { Router } from "express";
import {
  getAllProducts,
  getByID,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.services.js";

const router = Router();

router.get("/products", getAllProducts);

router.get("/products/:id", getByID);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
