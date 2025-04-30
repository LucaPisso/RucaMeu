import { Router } from "express";
import { User } from "../src/models/User.js";

const router = Router();

router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  res.json(user);
});

router.post("/users", async (req, res) => {
  const newUser = req.body;
  await User.create({
    name: newUser.name,
    lastName: newUser.lastName,
    phone: newUser.phone,
    email: newUser.email,
    password: newUser.password,
  });
  res.send(`Usuario creado: ${newUser.name}`);
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  //Modificar los datos del usuario.
  res.send(`Actualizando usuario con id: ${id}`);
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.destroy();

    res.json({ message: `Usuario con id ${id} eliminado correctamente` });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
