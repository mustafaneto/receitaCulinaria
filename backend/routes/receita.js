const express = require("express");

const {
  criarReceita,
  editarReceita,
  excluirReceita,
  buscarReceitas,
  buscarReceitaPorId,
  buscarReceitaPorIdUsuario,
  buscarReceitasPorCategoria,
  buscarReceitaPorFiltro,
} = require("../controllers/receitaController");

const router = express.Router();

router.post("/receitas", criarReceita);
router.put("/receitas/:id", editarReceita);
router.delete("/receitas/:id", excluirReceita);
router.get("/receitas", buscarReceitas);
router.get("/receitas/:id", buscarReceitaPorId);
router.get("/receitas/usuario/minhas", buscarReceitaPorIdUsuario);
router.get("/receitas/categoria/:id", buscarReceitasPorCategoria);
router.get("/receitas/busca/:busca", buscarReceitaPorFiltro);

module.exports = router;
