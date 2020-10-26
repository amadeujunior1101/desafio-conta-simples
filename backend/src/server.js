const express = require("express");
const routes = require("./routes");
const cors = require("cors");

require("./Config/db");

require("dotenv/config");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, function () {
  console.log("App listening on port 3333!");
});
