import React, { useState, useEffect } from "react";

import api from "../../services/api";

import imgLogo from "../../assets/logo-conta-simples.png";

import { logout } from "../../auth/authentication";

import { graphics } from "../../components/graphic";

import { extract } from "../../components/extract";

import { transactionCard } from "../../components/transactionCard";

import { handleResult } from "../../components/handleResult";

import "./index.css";

function Home({ history }) {
  const [user, setUser] = useState([]);

  const [company, setCompany] = useState([]);

  const [extractData, setExtractData] = useState([]);

  const [loadingTransaction, setLoadingTransaction] = useState(true);

  const [activeOperation, setActiveOperation] = useState(false);

  const [accountBalance, setAccountBalance] = useState(0);

  const [selectValue, setSelectValue] = useState("selecione");

  const [selectOperation, setSelectOperation] = useState("selecione");

  const [typeOperation, setTypeOperation] = useState("selecione");

  const [option, setOption] = useState("");

  const [flagCard, setFlagCard] = useState("ambos");

  const [flagGroup, setFlagGroup] = useState("");

  const [account_id, setAccount_id] = useState(0);

  const [endCard, setEndCard] = useState([]);

  const [entryUp, setEntryUp] = useState([]);

  const [entryDown, setEntryDown] = useState([]);

  const [withdrawalUp, setWithdrawalUp] = useState([]);

  const [withdrawalDown, setWithdrawalDown] = useState([]);

  const [transactionsGroupedByCard, setTransactionsGroupedByCard] = useState(
    []
  );

  const loadCompany = async () => {
    const user_id = localStorage.getItem("@JWT_TOKEN_USER");
    const token = localStorage.getItem("@JWT_TOKEN");

    const response = await api.get(`/company?user_id=${user_id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(response.data.client);

    setCompany(response.data.client.accounts);
  };

  function handleCreate(e) {
    let f = document.querySelector(".choiseAccount");
    let m = document.querySelector(".choiseAccount_mobile");
    f.style.display = "none";
    m.style.display = "none";

    const d = company.filter((item) => item.account_account == e.target.value);

    setAccount_id(d[0].id);
    setSelectValue(e.target.value);

    const newValue = company.filter(
      (item) => item.account_account !== selectValue
    );
    cardsAccount(d[0].id);

    if (newValue.length > 0) {
      setAccountBalance(newValue[0].account_balance);
      setLoadingTransaction(false);
      setActiveOperation(true);

      async function extractFull1() {
        const token = localStorage.getItem("@JWT_TOKEN");
        const response = await api.get(`/transaction?account_id=${d[0].id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        loadGraphics(response.data.transaction);
      }
      extractFull1();
      setOption("Graficos");
    }
  }

  function loadGraphics(data) {
    let entry = data.filter((item) => item.transaction_credit === 1);

    let entryDown = [];
    entryDown = entry
      .map((item) => item.transaction_date)
      .filter((value, index, self) => self.indexOf(value) === index);

    let entryUp = [];
    entryUp = entry
      .map((item) => item.transaction_value)
      .filter((value, index, self) => self.indexOf(value) === index);

    setEntryUp(entryDown);
    setEntryDown(entryUp);

    let withdrawal = data.filter((item) => item.transaction_credit === 0);

    let withdrawalDown = [];
    withdrawalDown = withdrawal
      .map((item) => item.transaction_date)
      .filter((value, index, self) => self.indexOf(value) === index);

    let withdrawalUp = [];
    withdrawalUp = withdrawal
      .map((item) => item.transaction_value)
      .filter((value, index, self) => self.indexOf(value) === index);

    setWithdrawalUp(withdrawalDown);
    setWithdrawalDown(withdrawalUp);
  }

  function handleFlagCard(e) {
    setFlagCard(e.target.value);
  }

  function handleFlagGroup(e) {
    setFlagGroup(e.target.value);
  }

  function handleCreateOperation(e) {
    let f = document.querySelector(".choiseOperation");
    f.style.display = "none";

    setSelectOperation(e.target.value);

    setTypeOperation(e.target.value);
  }

  async function cardsAccount(account_id) {
    const token = localStorage.getItem("@JWT_TOKEN");
    const response = await api.get(`/transaction?account_id=${account_id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const r = response.data.transaction.filter(
      (item) => item.transaction_type === "CARD"
    );
    let p = [];
    p = r
      .map((item) => item.transaction_end_card)
      .filter((value, index, self) => self.indexOf(value) === index);

    setEndCard(p);
  }

  useEffect(() => {
    loadCompany();
  }, []);

  return (
    <div id="box">
      <div className="navbar">
        <img src={imgLogo} alt="Logo" />
        <span onClick={() => logout(history)}>sair</span>
      </div>

      <div className="menu-top">
        <div className="options-menu">
          {
            <>
              <label htmlFor="">
                Nome: <span>{user.user_name}</span>
              </label>
              <label htmlFor="">
                Empresa: <span>{user.company_name}</span>
              </label>
              <label htmlFor="">
                CNPJ: <span>{user.company_cnpj}</span>
              </label>
            </>
          }

          <div className="select-box">
            <label htmlFor="">Conta:</label>
            <select id="" value={selectValue} onChange={(e) => handleCreate(e)}>
              <option value="selecione" className="choiseAccount_mobile">
                selecione
              </option>
              {company.map((item) => (
                <option key={item.id} value={item.account_account}>
                  {item.account_account}
                </option>
              ))}
            </select>
          </div>
          {accountBalance > 0 && (
            <label htmlFor="">Saldo: {accountBalance}</label>
          )}
        </div>
      </div>

      <div className="container">
        <div className="sidebar">
          <div className="options-menu">
            {
              <>
                <label htmlFor="">
                  Nome: <span>{user.user_name}</span>
                </label>
                <label htmlFor="">
                  Empresa: <span>{user.company_name}</span>
                </label>
                <label htmlFor="">
                  CNPJ: <span>{user.company_cnpj}</span>
                </label>
              </>
            }

            <div className="select-box">
              <label htmlFor="">Conta:</label>
              <select
                id=""
                value={selectValue}
                onChange={(e) => handleCreate(e)}
              >
                <option value="selecione" className="choiseAccount">
                  selecione
                </option>
                {company.map((item) => (
                  <option key={item.id} value={item.account_account}>
                    {item.account_account}
                  </option>
                ))}
              </select>
            </div>

            {accountBalance > 0 && (
              <label htmlFor="">Saldo: {accountBalance}</label>
            )}
          </div>
        </div>
        <div
          className="content"
          style={{ display: "block", height: "100vh", overflow: "auto" }}
        >
          <div className="container-box">
            {activeOperation === true && (
              <div className="container-options">
                <div className="select-box">
                  <label htmlFor="">Operação:</label>

                  <select
                    value={selectOperation}
                    onChange={(e) => handleCreateOperation(e)}
                    id=""
                  >
                    <option value="selecione" className="choiseOperation">
                      selecione
                    </option>
                    <option value="Extrato completo">Extrato completo</option>
                    <option value="Transações cartão">Transações cartão</option>
                  </select>
                </div>

                {typeOperation === "Extrato completo" ? (
                  <>
                    <div className="select-box">
                      <label htmlFor="">Transações:</label>
                      <select
                        id=""
                        value={flagCard}
                        onChange={(e) => handleFlagCard(e)}
                      >
                        <option value="ambos" id="choiseFlagCard">
                          ambos
                        </option>
                        <option value="credito">credito</option>
                        <option value="debito">debito</option>
                      </select>
                    </div>

                    <input
                      type="submit"
                      value="Buscar"
                      onClick={() =>
                        handleResult(
                          "Extrato completo",
                          account_id,
                          flagCard,
                          flagGroup,
                          setExtractData,
                          setOption,
                          setTransactionsGroupedByCard
                        )
                      }
                    />
                  </>
                ) : (
                  typeOperation === "Transações cartão" && (
                    <>
                      <div className="select-box">
                        <label htmlFor="">Final do cartão:</label>
                        <select
                          id=""
                          value={flagGroup}
                          onChange={(e) => handleFlagGroup(e)}
                        >
                          {flagGroup === "" && (
                            <option value="selecione" id="choiseFlagGroup">
                              selecione
                            </option>
                          )}
                          {endCard.length > 0 &&
                            endCard.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                        </select>
                      </div>
                      {flagGroup !== "" && (
                        <input
                          type="submit"
                          value="Buscar"
                          onClick={() =>
                            handleResult(
                              "Transações cartão",
                              account_id,
                              flagCard,
                              flagGroup,
                              setExtractData,
                              setOption,
                              setTransactionsGroupedByCard
                            )
                          }
                        />
                      )}
                    </>
                  )
                )}
              </div>
            )}
          </div>
          <div>
            {loadingTransaction === false ? (
              option === "Extrato completo" ? (
                <div
                  className="infos"
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    display: "grid",
                  }}
                >
                  {extract(extractData)}
                </div>
              ) : option === "Transações cartão" ? (
                <div
                  className="infos"
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    display: "grid",
                  }}
                >
                  {transactionCard(transactionsGroupedByCard)}
                </div>
              ) : (
                <div
                  className="infos"
                  style={{ justifyContent: "center", alignContent: "center" }}
                >
                  {option === "Graficos" &&
                    graphics(entryUp, withdrawalUp, entryDown, withdrawalDown)}
                </div>
              )
            ) : (
              <div
                className="infos"
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  display: "grid",
                }}
              >
                <img src={imgLogo} alt="Logo" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
