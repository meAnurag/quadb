import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sq = new Sequelize(process.env.DB_URL, {
  define: { timestamps: false },
});

export default sq;

export const testDB = async () => {
  try {
    await sq.authenticate();
    console.log("Database Connected.");
  } catch (error) {
    throw new Error("Unable to connect to the database:", error);
  }
};
