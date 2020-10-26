const Connection = require("../../../config/database/connection");

module.exports = {
  async store(req, res) {
    const {
      account_bank_number,
      account_bank_name,
      account_agency,
      account_account,
      account_digit_account,
      account_balance,
      company_id,
    } = req.body;

    try {
      const Account = {
        account_bank_number,
        account_bank_name,
        account_agency,
        account_account,
        account_digit_account,
        account_balance,
        company_id,
      };

      const account = await Connection("accounts").insert(Account);

      return res.json({ error: false, account: account });
    } catch (error) {
      return res.status(400).json({ error: true, message: error });
    }
  },
};
