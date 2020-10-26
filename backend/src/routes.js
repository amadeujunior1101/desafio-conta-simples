const { Router } = require("express");
const UserController = require("./controllers/Http/User/UserController");
const CompanyController = require("./controllers/Http/Company/CompanyController");
const AccountController = require("./controllers/Http/Account/AccountController");
const TransactionController = require("./controllers/Http/Transaction/ControllerTransaction");
const AuthController = require("./controllers/Http/Auth/AuthController");

const Auth = require("./middlewares/auth");

var routes = Router();

//Insere 01(um) novo usuário
routes.post("/create-user", UserController.store);

//Insere 01(uma) nova empresa
routes.post("/create-company", CompanyController.store);

// Lista 01(uma) empresa por id
routes.get("/company", Auth, CompanyController.show);

//Insere 01(uma) nova conta
routes.post("/create-account", AccountController.store);

//Cria 01(uma) nova transação
routes.post("/create-transaction", TransactionController.store);

// Lista todas as transações da conta pelo id
routes.get("/transaction", Auth, TransactionController.show);

routes.get("/transaction-card", Auth, TransactionController.transactionCard);

//Autenticação
routes.post("/authentication", AuthController.store);

module.exports = routes;
