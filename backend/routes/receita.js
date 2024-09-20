const express = require("express");

const {
  criarReceita,
  editarReceita,
  excluirReceita,
  buscarReceitas,
  imprimirReceita,
} = require("../controllers/receita");

const router = express.Router();

router.post("/receitas", criarReceita);
router.put("/receitas/:id", editarReceita);
router.delete("/receitas/:id", excluirReceita);
router.get("/receitas", buscarReceitas);
router.get("/receitas/:id/imprimir", imprimirReceita);

module.exports = router;
