import { DataTypes } from "sequelize";

import sq from "../db.js";

const User = sq.define(
  "users",
  {
    user_id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Not a valid Email id." },
      },
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_orders: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_logged_in: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { tableName: "users" }
);

export default User;
