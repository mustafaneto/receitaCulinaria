const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../conexao");

async function cadastrarUsuario(req, res) {
  const { nome, login, senha } = req.body;
  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const [result] = await pool.query(
      "INSERT INTO usuarios (nome, login, senha, criado_em, alterado_em) VALUES (?, ?, ?, NOW(), NOW())",
      [nome, login, hashedSenha]
    );
    res.status(201).json({ id: result.insertId, nome, login });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
}

async function loginUsuario(req, res) {
  const { login, senha } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE login = ?", [login]);
    if (rows.length === 0 || !(await bcrypt.compare(senha, rows[0].senha))) {
      return res.status(401).json({ error: "Login ou senha inválidos" });
    }
    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error); 
    res.status(500).json({ error: "Erro no login" });
  }
}


async function logoutUsuario(req, res) {
  res.json({ message: "Usuário desconectado" });
}

module.exports = { cadastrarUsuario, loginUsuario, logoutUsuario };
