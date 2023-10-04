import Express from "express";

import {
  deleteUser,
  getDetails,
  getImage,
  insertUser,
  login,
  updateUser,
} from "../controllers/user.controllers.js";

import authMiddleware from "../middlewares/auth.middlewares.js";

const userRouter = Express.Router();

userRouter.get("/details/:user_id", getDetails);
userRouter.put("/update", authMiddleware, updateUser);
userRouter.get("/image/:user_id", getImage);
userRouter.post("/insert", insertUser);
userRouter.delete("/delete/:user_id", deleteUser);
userRouter.get("/login", login);

export default userRouter;
