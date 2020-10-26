import React from "react";

import "../pages/Home/index.css";

export const extract = (extractData) => {
  return (
    <div className="base-extrato">
      <span htmlFor="" className="title-extrato">
        Extrato
      </span>
      <div className="group-extrato">
        {extractData.map((item) => (
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
