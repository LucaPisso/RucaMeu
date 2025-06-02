import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const CarritoProduct = sequelize.define(
  "carritoProduct",
  {
    carritoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "carrito", key: "id" },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "product", key: "id" },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  { timestamps: false, tableName: "carritoProducts" }
);
