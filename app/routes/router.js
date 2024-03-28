const express = require("express");
const pessoaController = require("../controller/pessoas_controller.js");

const router = express.Router();

router.post("/pessoas", pessoaController.createPessoa);
router.get("/pessoas/:id", pessoaController.selectPessoaById);
//router.get("/pessoas", pessoaController.buscaPessoas);
router.get("/contagem-pessoas", pessoaController.contagemPessoas);
router.get("/pessoas", pessoaController.selectAllPessoas);

module.exports = router;
