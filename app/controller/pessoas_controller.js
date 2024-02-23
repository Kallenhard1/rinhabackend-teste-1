const express = require("express");
const app = express();
const db = require("../../db/database.js");
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

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

const createPessoa = async (req, res) => {
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
};

const uploadPessoa = async (req, res) => {
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
};

const deletePessoa = async (req, res) => {
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
};

module.exports = {
  selectAllPessoas,
  selectPessoaById,
  createPessoa,
  uploadPessoa,
  deletePessoa,
};
