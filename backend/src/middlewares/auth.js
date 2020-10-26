require("dotenv/config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.json({ message: "Token required" });
    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.SECRET);

    const userId = decodedToken.userId;
    if (req.body.userId !== userId) {
      // throw "Invalid user ID";
      return res.sendStatus(403);
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).send(error);
  }
};
