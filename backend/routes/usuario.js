const express = require("express");

const {
  cadastrarUsuario,
  loginUsuario,
  logoutUsuario,
} = require("../controllers/usuario");

const router = express.Router();

router.post("/usuarios/cadastrar", cadastrarUsuario);
router.post("/usuarios/login", loginUsuario);
router.post("/usuarios/logout", logoutUsuario);

module.exports = router;
