# API Amigo Secreto Com NodeJS e MongoDB

Esta aplicação faz parte do teste técnico ADireto

## Pacotes inclusos

1. Nodemailer
2. Dotenv
3. express
4. CORS
5. Mongoose

## Setup

Antes de executar esta aplicação você precisa iniciar o servidor do mongoDB:
Para download acesse: [https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/]

1. No terminal execute o comando "mondod" (deixe executando)
2. Em outro terminal execute o comando "mondo" (deixe executando)

Para executar esta aplicação em modo desenvolvimento execute no terminal o comando:
`yarn start` ou `npm start`

> Development

Clonar do repositório:

    git clone git@github.com/amadeujunior1102/ad-2019/backend-node.git
    cd ad-2019/backend-node
    npm install
    yarn install


Saída do terminal:

```bash
> backend-node@1.0.0 start C:\node_projects\backend-node
> nodemon server.js
```

### Árvore de arquivos

```
├── src
│   ├── Config
|       ├── db.js
|       ├── mail.js
|       |
│   ├── Controllers
│   │   └── Http
|   |       └── User
|   |           └── UserController.js
|   |
│   ├── Models
|   |   └── User
│   ├── routes.js
|
├── .env.exemple
├── .gitignore
├── packege.json
├── README.md
├── server.js

```
