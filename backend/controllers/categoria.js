const pool = require("../conexao");

async function buscarCategorias(req, res) {
  try {
    const [categorias] = await pool.query("SELECT * FROM categorias");
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
}

module.exports = { buscarCategorias };
