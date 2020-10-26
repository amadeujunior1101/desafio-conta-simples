import React from "react";

export const transactionCard = (transactionsGroupedByCard) => {
  return (
    <div className="base-extrato">
      <span htmlFor="" className="title-extrato">
        Transações agrupadas por cartão
      </span>
      <div className="group-extrato">
        {transactionsGroupedByCard.map((item) => (
          <div key={item.id}>
            <label htmlFor="">{item.transaction_date}</label>
            <label htmlFor="">Tipo: {item.transaction_type}</label>
            <label htmlFor="">Descrição: {item.transaction_description}</label>
            <label htmlFor="">Valor: {item.transaction_value}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
