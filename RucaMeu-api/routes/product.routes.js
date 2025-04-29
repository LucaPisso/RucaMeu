import { Router } from "express";
import { Product } from "../src/models/Product.js";

const router = Router();

router.get("/products", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

router.post("/products", async (req, res) => {
  res.send("Agregando producto");
});

router.put("/products/:id", async (req, res) => {
  const products = await Product.findAll();
  res.send(`Actualizando producto con id: ${id}`);
});

router.delete("/products/:id", async (req, res) => {
  const products = await Product.findAll();
  res.send(`Borrando producto con id: ${id}`);
});

export default router;
