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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    productos: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  { timestamps: false }
);
