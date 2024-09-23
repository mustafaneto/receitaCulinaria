const express = require("express");

const { buscarCategorias } = require("../controllers/categoriaController");

const router = express.Router();

router.get("/categorias", buscarCategorias);

module.exports = router;
