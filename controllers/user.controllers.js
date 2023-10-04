import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.model.js";

const SALT_ROUNDS = 5;

export const getDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id, {
      attributes: { exclude: ["user_password"] },
    });

    if (user === null) res.status(404).send({ message: "User not found" });

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const result = await User.update(data, {
      where: {
        user_id: req.user.user_id,
      },
    });
    console.log(result);
    res.status(204).send({ message: "User updated." });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getImage = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id, {
      attributes: { exclude: ["user_email", "created_at", "user_password"] },
    });

    if (user === null) res.status(404).send({ message: "User not found" });

    res.status(200).send({ user_image: user.user_image });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const insertUser = async (req, res) => {
  try {
    if (req.body === null)
      return res.status(204).send({ message: "No body in request." });

    const userObj = req.body;

    const passwordHash = await bcrypt.hash(userObj.password, SALT_ROUNDS);

    const user = await User.create({
      user_name: userObj.user_name,
      user_email: userObj.user_email,
      user_password: passwordHash,
      user_image: userObj.user_image,
      created_at: new Date(),
    });

    console.log(user);
    res.status(201).send({ message: "User Created", user_id: user.user_id });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await User.destroy({
      where: {
        user_id: req.params.user_id,
      },
    });
    console.log(result);
    res.send({ message: "User Deleted." });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ where: { user_email: data.user_email } });

    const passMatch = await bcrypt.compare(
      data.user_password,
      user.user_password
    );

    if (!passMatch)
      return res.status(401).send({ message: "Incorrect email or password!" });

    await User.update(
      { last_logged_in: new Date() },
      { where: { user_email: data.user_email } }
    );

    const token = jwt.sign(
      {
        user_id: user.user_id,
        user_email: user.user_email,
      },
      process.env.SECRET
    );

    res.send({ token });
  } catch (err) {
    res.status(500).send(err);
  }
};
