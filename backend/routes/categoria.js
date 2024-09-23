const express = require("express");

const { buscarCategorias } = require("../controllers/categoria");

const router = express.Router();

router.get("/categorias", buscarCategorias);

module.exports = router;
