const express = require("express");
const app = express();
let db = require("../db/database.js");
const bodyParser = require("body-parser");
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/pessoas", (req, res) => {
  const pessoas = db.pessoas;
  try {
    res.status(200).json({
      pessoas: pessoas,
    });
  } catch (err) {
    res.status(401).json({
      message: "Não foi possivel acessar pessoas",
      error: err,
    });
  }
});

app.get("/pessoas/:id", (req, res) => {
  const { id } = req.params;
  const pessoa = db.pessoas.filter((obj) => obj.id === Number(id));
  try {
    res.status(200).json({
      id: id,
      title: pessoa[0].name,
    });
  } catch (err) {
    res.status(401).json({
      message: "Não foi possivel acessar pessoa",
      error: err,
    });
  }
});

app.post("/pessoas", (req, res) => {
  const { id, name } = req.body;
  const body = {
    id: id,
    name: name,
  };

  try {
    db.pessoas.push(body);
    res.status(200).json({
      success: true,
      message: "Pessoa cadastrada com sucesso!",
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Não foi possivel cadastrar pessoa",
    });
  }
});

app.put("/pessoas/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const pessoa = db.pessoas.filter((obj) => obj.id === Number(id));
  try {
    pessoa[0] = name;
    res.status(200).json({
      success: true,
      message: "Pessoa atualizada com sucesso!",
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Não foi possivel atualizar pessoa",
    });
  }
});

app.delete("pessoas/:id", (req, res) => {
  const { id } = req.params;
  const pessoa = db.pessoas.filter((obj) => obj.id === Number(id));
  try {
    db.pessoas.pop(pessoa);
    res.status(200).json({
      success: true,
      message: "Pessoa deletada com sucesso!",
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Não foi possivel deletar pessoa",
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});
