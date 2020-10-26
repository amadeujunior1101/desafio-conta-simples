import React, { useState } from "react";

import { singIn } from "../../auth/authentication";

import imgSidebar from "../../assets/img-sidebar.png";
import logo from "../../assets/logo-conta-simples.png";

import "./index.css";

function App({ history }) {
  const [emailValue, setEmailvalue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  function handleEmail(e) {
    e.preventDefault();
    setEmailvalue(e.target.value);
  }

  function handlePassword(e) {
    e.preventDefault();
    setPasswordValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div id="box">
      <div className="content" style={{ paddingTop: 0 }}>
        <div className="sidebar-left">
          <img src={imgSidebar} alt="Iamge sideabar" className="img-login" />
        </div>
        <div className="container-rigth">
          <div className="form">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>

            <h1>
              <strong>Bem-vindo</strong> ao Internet Banking da Conta Simples
            </h1>

            <p>Preencha os campos abaixo para acessar sua conta</p>

            <div className="register">
              <form action="" onSubmit={handleSubmit}>
                <div className="border-field">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    value={emailValue}
                    onChange={(e) => handleEmail(e)}
                  />
                </div>
                <label className="alert-fields">Obrigatório</label>

                <div className="border-field">
                  <label htmlFor="">Senha</label>
                  <input
                    type="password"
                    value={passwordValue}
                    onChange={(e) => handlePassword(e)}
                  />
                </div>
                <label className="alert-fields">Obrigatório</label>
              </form>
              <div className="button">
                <input
                  type="submit"
                  value="Entrar"
                  onClick={() => {
                    singIn(emailValue, passwordValue, history);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
