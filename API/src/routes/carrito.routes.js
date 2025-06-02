import { Router } from "express";
import {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarDelCarrito,
} from "../services/carrito.services.js";
import { verifyToken } from "../services/user.services.js";
const router = Router();

router.post("/carrito/:id", verifyToken, agregarAlCarrito);
router.get("/carrito", verifyToken, obtenerCarrito);
router.delete("/carrito/delete/:productId", verifyToken, eliminarDelCarrito);

export default router;
