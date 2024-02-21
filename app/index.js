const express = require("express");
const app = express();
const db = require("../db/database.js");
const bodyParser = require("body-parser");
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM pg_stat_activity;");
    res.status(200).json({ message: result });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erro interno do servidor", error: err.message });
  }
});

app.get("/pessoas", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM pessoas;");
    res.status(200).json({
      pessoas: result,
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
    const pessoaNome = result.rows[0].nome;
    res.status(200).json({
      id: id,
      nome: pessoaNome,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Não foi possível acessar pessoa",
      error: err.message,
    });
  }
});

app.post("/pessoas", async (req, res) => {
  const { id, nome } = req.body;

  try {
    await db.query(`INSERT INTO pessoas (id, nome) VALUES($1, $2);`, [
      id,
      nome,
    ]);
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

app.put("/pessoas/:id", async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    await db.query(`UPDATE pessoas SET nome = $2 WHERE id = $1;`, [id, nome]);
    res.status(200).json({
      success: true,
      message: "Pessoa atualizada com sucesso!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Não foi possível atualizar pessoa",
    });
  }
});

app.delete("/pessoas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(`DELETE FROM pessoas WHERE id = $1;`, [id]);
    if (result.rowCount > 0) {
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
