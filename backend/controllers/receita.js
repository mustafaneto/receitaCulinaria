const jwt = require('jsonwebtoken');
const pool = require("../conexao");

async function criarReceita(req, res) {
  const { nome, tempo_preparo_minutos, porcoes, url_imagem, modo_preparo, ingredientes, id_categorias } = req.body;

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id_usuarios = decoded.id;

    const [result] = await pool.query(
      "INSERT INTO receitas (id_usuarios, nome, tempo_preparo_minutos, porcoes, url_imagem, modo_preparo, ingredientes, id_categorias, criado_em, alterado_em) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [id_usuarios, nome, tempo_preparo_minutos, porcoes, url_imagem, modo_preparo, ingredientes, id_categorias]
    );

    res.status(201).json({ id: result.insertId, nome });
  } catch (error) {
    console.error('Erro ao criar receitas:', error);

    res.status(500).json({ error: "Erro ao criar receita" });
  }
}

async function buscarReceitas(req, res) {
  const { id_usuarios } = req.query;
  try {
    const [receitas] = await pool.query(
      "SELECT * FROM receitas WHERE id_usuarios = ?",
      [id_usuarios]
    );
    res.json(receitas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar receitas" });
  }
}

module.exports = { criarReceita, buscarReceitas };
