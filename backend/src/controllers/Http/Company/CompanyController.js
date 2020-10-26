const Connection = require("../../../config/database/connection");

module.exports = {
  async store(req, res) {
    const { company_name, company_cnpj, user_id } = req.body;

    try {
      const Company = {
        company_name: company_name,
        company_cnpj: company_cnpj,
        user_id: user_id,
      };

      const company = await Connection("companies").insert(Company);

      return res.json({ error: false, company: company });
    } catch (error) {
      return res.status(400).json({ error: true, message: error });
    }
  },

  async show(req, res) {
    const { user_id } = req.query;

    const company = await Connection("companies")
      .join("users", "users.id", "=", "companies.user_id")
      .where("companies.user_id", user_id);

    const accounts = await Connection("accounts").where(
      "accounts.company_id",
      company[0].id
    );

    objCompany = {
      user_id: company[0].id,
      user_name: company[0].user_name,
      user_cpf: company[0].user_cpf,
      company_name: company[0].company_name,
      company_name: company[0].company_name,
      company_cnpj: company[0].company_cnpj,
      accounts: accounts,
    };

    return res.json({ error: false, client: objCompany });
  },
};
