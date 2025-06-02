import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Carrito = sequelize.define(
  "carrito",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);
