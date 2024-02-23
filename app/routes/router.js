const express = require("express");
const pessoaController = require("../controller/pessoas_controller.js");

const router = express.Router();

router.get("/pessoas", pessoaController.selectAllPessoas);
router.get("/pessoas/:id", pessoaController.selectPessoaById);
router.post("/pessoas", pessoaController.createPessoa);
router.put("/pessoas/:id", pessoaController.uploadPessoa);
router.delete("/pessoas/:id", pessoaController.deletePessoa);

module.exports = router;
