import { Carrito } from "../models/Carrito.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
const { JsonWebTokenError } = jwt;

export const agregarAlCarrito = async (req, res) => {
  const userId = req.user.id; // del token
  const productId = req.params.id;
  const { cantidad } = req.body;

  try {
    // Verificar que el usuario existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const carrito = await Carrito.findOne({ where: { userId } }); //busca si el usuario tiene carrito asociado al ID
    if (!carrito) {
      carrito = await Carrito.create({
        userId,
        productos: [{ productId: productId, cantidad: cantidad }],
      }); //si no tiene carrito, crea uno
    } else {
      const productosActuales = carrito.productos;
      const nuevoProducto = { productId: productId, cantidad: cantidad };
      productosActuales.push(nuevoProducto);
      await carrito.update({ productos: productosActuales });
    }

    res.status(201).json({ message: "Producto agregado al carrito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al agregar al carrito", error: error.message });
  }
};

export const obtenerCarrito = async (req, res) => {
  const userId = req.user.id;

  try {
    const carrito = await Carrito.findOne({
      where: { userId },
      include: [Product],
    });

    if (!carrito)
      return res.status(404).json({ message: "Carrito vacío o no encontrado" });

    res.json(carrito);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el carrito", error: error.message });
  }
};

export const eliminarDelCarrito = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    const carrito = await Carrito.findOne({ where: { userId } });
    if (!carrito)
      return res.status(404).json({ message: "Carrito no encontrado" });

    const eliminado = await Product.destroy({
      where: { id: productId, carritoId: carrito.id },
    });

    if (!eliminado)
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });

    res.json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar producto", error: error.message });
  }
};
