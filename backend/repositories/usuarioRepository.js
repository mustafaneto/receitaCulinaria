const pool = require("../conexao");
const Usuario = require("../models/usuarioModel");

async function criarUsuario(nome, login, senha) {
  const [result] = await pool.query(
    "INSERT INTO usuarios (nome, login, senha, criado_em, alterado_em) VALUES (?, ?, ?, NOW(), NOW())",
    [nome, login, senha]
  );
  return new Usuario(result.insertId, nome, login, senha);
}

async function buscarUsuarioPorLogin(login) {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE login = ?", [login]);
  if (rows.length > 0) {
    const { id, nome, senha, criado_em, alterado_em } = rows[0];
    return new Usuario(id, nome, login, senha, criado_em, alterado_em);
  }
  return null;
}

module.exports = {
  criarUsuario,
  buscarUsuarioPorLogin,
};
