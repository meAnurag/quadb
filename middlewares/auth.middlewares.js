import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    const user = jwt.verify(token, process.env.SECRET);
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
};
