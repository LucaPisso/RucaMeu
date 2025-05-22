import { Router } from "express";
import {
  getAllProducts,
  getByID,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.services.js";
import { verifyToken } from "../services/user.services.js";

const router = Router();

router.get("/products", getAllProducts);

router.get("/products/:id", getByID);

router.post("/products", verifyToken, createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
