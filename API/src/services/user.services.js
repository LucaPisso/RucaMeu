import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  users.forEach((user) => (user.password = ""));
  res.json({ success: true, users });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Usuario no encontrado" });
  }
  user.password = "";
  res.json({ success: true, user });
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
      .send({ success: false, message: "Usuario existente" });
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
    .json({ success: true, message: `Usuario creado: ${req.body.name}` });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Usuario no encontrado" });
  } else {
    //Hasheamos el password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //y actualizamos el usuario
    await User.update(
      {
        ...req.body, // req.body = { name:"value", lastName:"value", ...}
        password: hashedPassword,
      },
      { where: { id } }
    );
    res
      .status(200)
      .json({ success: true, message: "Datos modificados correctamente." });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Usuario no encontrado." });
  } else {
    await user.destroy();
    res.json({
      success: true,
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
      .json({ success: false, message: "No posee autorización requerida" });
  }

  try {
    // Verifica que el token sea válido usando la clave secreta
    const payload = jwt.verify(token, "RucaMeu-2025");

    req.userId = payload.id;

    // Si el token es válido, se puede acceder a su contenido (payload)
    console.log(payload);

    // Llama al siguiente middleware o controlador en la cadena
    next();
  } catch (error) {
    // Si el token no es válido o ha expirado, devuelve error 403 (prohibido)
    return res
      .status(403)
      .json({ success: false, message: "No posee permisos correctos" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "No existe usuario registrado con ese email",
    });
  }

  // Compara la contraseña ingresada (texto plano) con el hash guardado
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ success: false, message: "Email y/o contraseña incorrectas" });
  }

  const secretKey = process.env.JWT_SECRET || "RucaMeu-2025";

  const token = jwt.sign({ email, id: user.id }, secretKey, {
    expiresIn: "1h",
  });

  console.log(token);

  return res.json({
    success: true,
    message: "Login exitoso",
    token,
    user: {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      role: user.role,
    },
  });
};
