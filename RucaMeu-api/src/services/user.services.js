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
  //Comprobamos si el usuario ya existe por el email
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email,
      //email: req.body.email es lo mismo
    },
  });
  if (user) {
    return res.status(400).send({ message: "Usuario existente" });
  }

  //Hasheamos el password
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //y creamos el nuevo usuario y llo insertamos
  const newUser = await User.create({
    ...req.body, // req.body = { name:"value", lastName:"value", ...}
    password: hashedPassword,
  });

  //res.json(newUser.id);
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

export const loginUser = async (req, res) => {
  // Extrae email y password del body de la request
  const { email, password } = req.body;

  // Busca el usuario por email
  const user = await User.findOne({
    where: { email },
  });

  // Si no existe, devuelve error 401 (No autorizado)
  if (!user) return res.status(401).send({ message: "Usuario no existente" });

  // Compara la contraseña ingresada con el hash almacenado
  const comparison = await bcrypt.compare(password, user.password);

  // Si no coinciden, devuelve error 401
  if (!comparison)
    return res.status(401).send({ message: "Email y/o contraseña incorrecta" });

  // Clave secreta para firmar el token (debería estar en variables de entorno)
  const secretKey = "RucaMeu-2025";

  // Genera un token JWT que expira en 1 hora
  const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

  // Devuelve el token al cliente
  console.log(token);
  return res.json(token);
};
