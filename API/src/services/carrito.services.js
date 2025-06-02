import { Carrito } from "../models/Carrito.js";
import { Product } from "../models/Product.js";
import { CarritoProduct } from "../models/CarritoProduct.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
const { JsonWebTokenError } = jwt;

export const agregarAlCarrito = async (req, res) => {
  const userId = req.userId;
  const productId = req.params.id;
  console.log("productId:", productId);
  const { cantidad } = req.body;

  try {
    // Buscar o crear el carrito del usuario
    let carrito = await Carrito.findOne({ where: { userId } });
    if (!carrito) {
      carrito = await Carrito.create({ userId });
    }

    // Verificar si el producto ya está en el carrito
    const [registro, creado] = await CarritoProduct.findOrCreate({
      where: {
        carritoId: carrito.id,
        productId,
      },
      defaults: {
        quantity: cantidad || 1,
      },
    });

    if (!creado) {
      registro.quantity += cantidad || 1;
      await registro.save();
    }

    res.status(200).json({ message: "Producto agregado al carrito." });
  } catch (error) {
    console.error("Error en agregarAlCarrito:", error);
    res.status(500).json({ error: "Error al agregar producto al carrito." });
  }
};

export const obtenerCarrito = async (req, res) => {
  const userId = req.userId;

  try {
    const carrito = await Carrito.findOne({
      where: { userId },
      include: {
        model: Product,
        through: { attributes: ["quantity"] },
      },
    });

    if (!carrito)
      return res.status(404).json({ message: "Carrito no encontrado." });

    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito." });
  }
};

export const eliminarDelCarrito = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.params;

  try {
    const carrito = await Carrito.findOne({ where: { userId } });
    if (!carrito)
      return res.status(404).json({ message: "Carrito no encontrado." });

    await CarritoProduct.destroy({
      where: {
        carritoId: carrito.id,
        productId,
      },
    });

    res.json({ message: "Producto eliminado del carrito." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto del carrito." });
  }
};
