import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  verifyToken,
  makeUserAdmin,
} from "../services/user.services.js";

const router = Router();

router.get("/users", getAllUsers);

router.get("/users/:id", getUserById);

router.post("/users", createUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.post("/login", loginUser);

router.put("/make-admin/:id", verifyToken, makeUserAdmin);

export default router;
