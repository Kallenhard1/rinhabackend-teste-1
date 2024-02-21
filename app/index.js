const express = require("express");
const app = express();
const db = require("../db/database.js");
const bodyParser = require("body-parser");
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/pessoas", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM pessoas;");
    res.status(200).json({
      pessoas: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Não foi possível acessar pessoas",
      error: err.message,
    });
  }
});

app.get("/pessoas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT nome FROM pessoas WHERE id = $1;", [
      id,
    ]);
    const pessoaName = result.rows[0].nome;
    res.status(200).json({
      id: id,
      name: pessoaName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Não foi possível acessar pessoa",
      error: err.message,
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
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Não foi possível cadastrar pessoa",
    });
  }
});

app.put("/pessoas/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const pessoa = db.pessoas.find((obj) => obj.id === Number(id));

  try {
    if (pessoa) {
      pessoa.name = name; // Atualiza a propriedade 'name'
      res.status(200).json({
        success: true,
        message: "Pessoa atualizada com sucesso!",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Pessoa não encontrada",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Não foi possível atualizar pessoa",
    });
  }
});

app.delete("/pessoas/:id", (req, res) => {
  const { id } = req.params;
  const index = db.pessoas.findIndex((obj) => obj.id === Number(id));

  try {
    if (index !== -1) {
      db.pessoas.splice(index, 1);
      res.status(200).json({
        success: true,
        message: "Pessoa deletada com sucesso!",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Pessoa não encontrada",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Não foi possível deletar pessoa",
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});
