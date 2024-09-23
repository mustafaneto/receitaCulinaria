const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usuarioRepository = require("../repositories/usuarioRepository");

async function cadastrarUsuario(req, res) {
  const { nome, login, senha } = req.body;
  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const usuario = await usuarioRepository.criarUsuario(nome, login, hashedSenha);
    res.status(201).json({ id: usuario.id, nome: usuario.nome, login: usuario.login });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
}

async function loginUsuario(req, res) {
  const { login, senha } = req.body;
  try {
    const usuario = await usuarioRepository.buscarUsuarioPorLogin(login);
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ error: "Login ou senha inválidos" });
    }
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro no login" });
  }
}

async function logoutUsuario(req, res) {
  res.json({ message: "Usuário desconectado" });
}

module.exports = { cadastrarUsuario, loginUsuario, logoutUsuario };
