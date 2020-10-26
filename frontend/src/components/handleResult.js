import "../pages/Home/index.css";

import api from "../services/api";

import "../pages/Home/index.css";

export const handleResult = (
  arg,
  account_id,
  flagCard,
  flagGroup,
  setExtractData,
  setOption,
  setTransactionsGroupedByCard
) => {
  if (arg === "Extrato completo") {
    const token = localStorage.getItem("@JWT_TOKEN");
    async function extractFull() {
      const response = await api.get(`/transaction?account_id=${account_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (flagCard === "ambos") {
        setExtractData(response.data.transaction);
      } else if (flagCard === "credito") {
        const r = response.data.transaction.filter(
          (item) => item.transaction_credit === 1
        );

        setExtractData(r);
      } else if (flagCard === "debito") {
        const r = response.data.transaction.filter(
          (item) => item.transaction_credit === 0
        );
        setExtractData(r);
      }
    }
    extractFull();
    setOption("Extrato completo");
  }
  if (arg === "Transações cartão") {
    const token = localStorage.getItem("@JWT_TOKEN");
    async function transactionCard() {
      const response = await api.get(
        `/transaction-card?transaction_end_card=${flagGroup}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactionsGroupedByCard(response.data.transaction);
    }

    transactionCard();

    setOption("Transações cartão");
  }
};
