import { Product } from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  if (!products) {
    return res
      .status(404)
      .json({ succes: false, message: "No se encontraron productos" });
  }
  res.json({ succes: true, products });
};

export const getByID = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res
      .status(404)
      .json({ succes: false, message: "Producto no encontrado" });
  }
  res.json({ succes: true, product });
};

export const createProduct = async (req, res) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ succes: false, message: "Nombre y precio son requeridos" });
  }
  const newProduct = await Product.create(req.body);
  res.json({ product: newProduct });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res
      .status(404)
      .json({ succes: false, message: "Producto no encontrado" });
  }
  await product.update(req.body);

  res.json({ succes: true, product });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res
      .status(404)
      .json({ succes: false, message: "Producto no encontrado" });
  }
  await product.destroy();
  res.json({
    succes: true,
    message: `El Producto ${product.name} ha sido eliminado correctamente`,
  });
};
