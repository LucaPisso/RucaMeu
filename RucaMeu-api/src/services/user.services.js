import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json({ succes: true, data: users });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res
      .status(404)
      .json({ succes: false, message: "Usuario no encontrado" });
  }
  res.json({ succes: true, data: user });
};

export const createUser = async (req, res) => {
  //Comprobamos si el usuario ya existe por el email
  const { email } = req.body; //es mejor desglosarlo todo porque confirmPassword no es necesario y en ciertos ORM lo incluiría en la tabla. No en sequelize
  const user = await User.findOne({
    where: {
      email,
      //email: req.body.email es lo mismo
    },
  });
  if (user) {
    return res
      .status(400)
      .send({ succes: false, message: "Usuario existente" });
  }

  //Hasheamos el password
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //y creamos el nuevo usuario y lo insertamos
  const newUser = await User.create({
    ...req.body, // req.body = { name:"value", lastName:"value", ...}
    password: hashedPassword,
  });

  //res.json(newUser.id);
  res
    .status(200)
    .json({ succes: true, message: `Usuario creado: ${req.body.name}` });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res
      .status(404)
      .json({ succes: false, message: "Usuario no encontrado" });
  } else {
    await User.update(req.body, { where: { id } });
    res
      .status(200)
      .json({ succes: true, message: "Datos modificados correctamente." });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res
      .status(404)
      .json({ succes: false, message: "Usuario no encontrado." });
  } else {
    await user.destroy();
    res.json({
      succes: true,
      message: `Usuario con id ${id} eliminado correctamente.`,
    });
  }
};

export const verifyToken = (req, res, next) => {
  // Obtiene el valor del header "Authorization" de la solicitud (si no existe, usa cadena vacía)
  const header = req.header("Authorization") || "";

  // Extrae el token desde el header
  const token = header.split(" ")[1];

  // Si no hay token, devuelve error 401 (no autorizado)
  if (!token) {
    return res
      .status(401)
      .json({ succes: false, message: "No posee autorización requerida" });
  }

  try {
    // Verifica que el token sea válido usando la clave secreta
    const payload = jwt.verify(token, "RucaMeu-2025");

    // Si el token es válido, se puede acceder a su contenido (payload)
    console.log(payload);

    // Llama al siguiente middleware o controlador en la cadena
    next();
  } catch (error) {
    // Si el token no es válido o ha expirado, devuelve error 403 (prohibido)
    return res
      .status(403)
      .json({ succes: false, message: "No posee permisos correctos" });
  }
};

export const loginUser = async (req, res) => {
  // Extrae email y password del body de la request
  const { email, password } = req.body;

  // Busca el usuario por email
  const user = await User.findOne({
    where: { email },
  });

  // Si no existe, devuelve error 401 (No autorizado)
  if (!user)
    return res
      .status(401)
      .json({ succes: false, message: "Usuario no existente" });

  // Compara la contraseña ingresada con el hash almacenado
  const comparison = await bcrypt.compare(password, user.password);

  // Si no coinciden, devuelve error 401
  if (!comparison)
    return res
      .status(401)
      .json({ succes: false, message: "Email y/o contraseña incorrecta" });

  // Clave secreta para firmar el token (debería estar en variables de entorno)
  const secretKey = "RucaMeu-2025";

  // Genera un token JWT que expira en 1 hora
  const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

  // Devuelve el token al cliente
  console.log(token);
  return res.json({
    succes: true,
    message: "Login exitoso",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};
