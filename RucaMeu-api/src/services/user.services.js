import { User } from "../models/User.js";

export const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  res.json(user);
};

export const createUser = async (req, res) => {
  await User.create(req.body); // req.body = { name:"value", lastName:"value", ...}
  res.status(200).json(`Usuario creado: ${req.body.name}`);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  } else {
    await User.update(req.body, { where: { id } });
    res.status(200).json("Datos modificados correctamente.");
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  } else {
    await user.destroy();
    res.json({ message: `Usuario con id ${id} eliminado correctamente.` });
  }
};
