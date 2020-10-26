const Connection = require("../../../config/database/connection");
const bcrypt = require("bcrypt");

module.exports = {
  async store(req, res) {
    const {
      user_name,
      user_cpf,
      user_email,
      user_cell_phone,
      user_password,
    } = req.body;

    try {
      const password_hash = await bcrypt.hash(user_password, 10);

      const User = {
        user_name: user_name,
        user_cpf: user_cpf,
        user_email: user_email,
        user_cell_phone: user_cell_phone,
        user_password: password_hash,
      };

      const user = await Connection("users").insert(User);

      return res.json({ error: false, users: user });
    } catch (error) {
      return res.status(400).json({ error: true, message: error });
    }
  },
};
