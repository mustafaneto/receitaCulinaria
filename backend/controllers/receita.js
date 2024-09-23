const jwt = require("jsonwebtoken");
const pool = require("../conexao");

async function criarReceita(req, res) {
  const {
    nome,
    tempo_preparo_minutos,
    porcoes,
    url_imagem,
    modo_preparo,
    ingredientes,
    id_categorias,
  } = req.body;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id_usuarios = decoded.id;

    const [result] = await pool.query(
      "INSERT INTO receitas (id_usuarios, nome, tempo_preparo_minutos, porcoes, url_imagem, modo_preparo, ingredientes, id_categorias, criado_em, alterado_em) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [
        id_usuarios,
        nome,
        tempo_preparo_minutos,
        porcoes,
        url_imagem,
        modo_preparo,
        ingredientes,
        id_categorias,
      ]
    );

    res.status(201).json({ id: result.insertId, nome });
  } catch (error) {
    console.error("Erro ao criar receitas:", error);

    res.status(500).json({ error: "Erro ao criar receita" });
  }
}

async function buscarReceitas(req, res) {
  try {
    const [receitas] = await pool.query("SELECT * FROM receitas");
    res.json(receitas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar receitas" });
  }
}

async function buscarReceitaPorId(req, res) {
  const { id } = req.params;

  try {
    const [receita] = await pool.query("SELECT * FROM receitas WHERE id = ?", [
      id,
    ]);

    if (receita.length === 0) {
      return res.status(404).json({ error: "Receita não encontrada" });
    }

    res.json(receita[0]); // Return the receita object
  } catch (error) {
    console.error("Erro ao buscar receita:", error);
    res.status(500).json({ error: "Erro ao buscar receita" });
  }
}

async function buscarReceitasPorCategoria(req, res) {
  const { id } = req.params;

  try {
    const [receitas] = await pool.query(
      "SELECT * FROM receitas WHERE id_categorias = ?",
      [id]
    );
    res.json(receitas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar receitas" });
  }
}

async function buscarReceitaPorFiltro(req, res) {
  const { busca } = req.params;

  try {
    const [receitas] = await pool.query(
      "SELECT * FROM receitas WHERE nome LIKE ?",
      [`%${busca}%`]
    );
    res.json(receitas);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Erro ao buscar receitas" });
  }
}


module.exports = {
  criarReceita,
  buscarReceitas,
  buscarReceitaPorId,
  buscarReceitasPorCategoria,
  buscarReceitaPorFiltro,
};
