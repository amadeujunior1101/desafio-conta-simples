const Connection = require("../../../config/database/connection");

module.exports = {
  async store(req, res) {
    const {
      transaction_date,
      transaction_value,
      transaction_end_card,
      transaction_type,
      transaction_description,
      transaction_establishment,
      transaction_credit,
      account_id,
    } = req.body;

    try {
      const Transaction = {
        transaction_date,
        transaction_value,
        transaction_end_card,
        transaction_type,
        transaction_description,
        transaction_establishment,
        transaction_credit,
        account_id,
      };

      const transaction = await Connection("transactions").insert(Transaction);

      return res.json({ error: false, transaction: transaction });
    } catch (error) {
      return res.status(400).json({ error: true, message: error });
    }
  },

  async show(req, res) {
    const { account_id } = req.query;

    const transaction = await Connection("transactions")
      // .join("accounts", "accounts.id", "=", "transactions.account_id")
      .where("transactions.account_id", account_id);

    return res.json({ error: false, transaction: transaction });
  },

  async transactionCard(req, res) {
    const { transaction_end_card } = req.query;

    const transaction = await Connection("transactions")
      // .join("accounts", "accounts.id", "=", "transactions.account_id")
      .where("transaction_end_card", transaction_end_card);

    return res.json({ error: false, transaction: transaction });
  },
};
