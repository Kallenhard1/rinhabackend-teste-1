const express = require("express");
const app = express();
const db = require("../../db/database.js");
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const createPessoa = async (req, res) => {
  const { apelido, nome, nascimento, stack } = req.body;

  try {
    await db.query(
      `INSERT INTO pessoas (apelido, nome, nascimento, stack) VALUES($1, $2, $3, $4);`,
      [apelido, nome, nascimento, stack]
    );
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
};

const selectPessoaById = async (req, res) => {
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
};

const buscaPessoas = async (req, res) => {
  const termo = req.query.t;

  if (!termo) {
    return res.status(400).json({
      success: false,
      message: "O parâmetro 't' é obrigatório para busca.",
    });
  }

  try {
    const result = await db.query(
      "SELECT * FROM pessoas WHERE nome ILIKE $1;",
      [`%${termo}%`]
    );
    res.status(200).json({
      pessoas: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erro ao realizar busca por pessoas",
    });
  }
};

const contagemPessoas = async (req, res) => {
  try {
    const result = await db.query("SELECT COUNT(*) AS total FROM pessoas;");
    res.status(200).json({
      total: result.rows[0].total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erro ao obter contagem de pessoas cadastradas",
    });
  }
};

const selectAllPessoas = async (req, res) => {
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
};

module.exports = {
  createPessoa,
  selectPessoaById,
  buscaPessoas,
  contagemPessoas,
  selectAllPessoas,
};
