const express = require("express");

const {
  cadastroUsuario,
  loginUsuario,
  logoutUsuario,
} = require("./controllers/usuario");

const router = express.Router();

router.post("/usuarios/cadastrar", cadastroUsuario);
router.post("/usuarios/login", loginUsuario);
router.post("/usuarios/logout", logoutUsuario);

module.exports = router;
