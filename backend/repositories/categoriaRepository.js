const pool = require("../conexao");
const Categoria = require("../models/categoriaModel");

async function buscarTodasCategorias() {
  const [rows] = await pool.query("SELECT * FROM categorias");
  return rows.map(row => new Categoria(row.id, row.nome));
}

module.exports = {
  buscarTodasCategorias,
};
