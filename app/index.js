const express = require("express");
const app = express();
let db = require("../db/database.js");
const bodyParser = require("body-parser");
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World\n");
});

// Teste, pegando do banco, só um exemplo usando objetos no banco
app.get("/pessoas", (req, res) => {
  const pessoas = db.pessoas;
  res.status(200).json({
    pessoas: pessoas,
  });
});

app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});
