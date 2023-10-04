import Express from "express";
import morgan from "morgan";
import Cors from "cors";
import dotenv from "dotenv";

import { testDB } from "./db.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

await testDB();

app.get("/", (req, res) => {
  res.send({ message: "Server running." });
});

app.use(userRouter);

app.listen(PORT, () => console.log("Listening at", PORT));
