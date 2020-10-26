const Connection = require("../../../config/database/connection");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require("dotenv/config");

module.exports = {
  async store(req, res) {
    const { user_email, user_password } = req.body;

    try {
      const user = await Connection("users").where("user_email", user_email);

      if (!user[0]) return res.json({ error: true, message: "user not found" });

      const pass = await bcrypt.compare(user_password, user[0].user_password);

      if (pass === false)
        return res.json({ error: true, message: "invalid password" });

      const id = user[0].id;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: "1d", // expires in 5min
      });

      return res.json({ error: false, user_id: id, auth: true, token: token });
    } catch (error) {
      return res.status(400).json({ error: true, message: error });
    }
  },
};
