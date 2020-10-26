import React from "react";
import { Bar } from "react-chartjs-2";

import "../pages/Home/index.css";

export const graphics = (entryUp, withdrawalUp, entryDown, withdrawalDown) => {

  const dataEntry = {
    labels: entryUp,

    datasets: [
      {
        type: "line",
        label: "Resumo semanal",
        borderColor: "blue",
        borderWidth: 1,
        hoverBackgroundColor: "blue",
        data: entryDown,
      },
    ],
  };

  const dataWithdrawal = {
    labels: withdrawalUp,

    datasets: [
      {
        type: "line",
        label: "Resumo semanal",
        borderColor: "blue",
        borderWidth: 1,
        hoverBackgroundColor: "blue",
        data: withdrawalDown,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
  };

  return (
    <div style={{}}>
      <label htmlFor="">Entradas</label>
      <div id="window-size" className="position-graphic">
        <Bar data={dataEntry} height={300} options={options} />
      </div>

      <label htmlFor="">Saídas</label>
      <div id="window-size" className="position-graphic">
        <Bar data={dataWithdrawal} height={220} options={options} />
      </div>
    </div>
  );
};
