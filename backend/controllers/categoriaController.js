const categoriaRepository = require("../repositories/categoriaRepository");

async function buscarCategorias(req, res) {
  try {
    const categorias = await categoriaRepository.buscarTodasCategorias();
    res.json(categorias);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
}

module.exports = { buscarCategorias };
