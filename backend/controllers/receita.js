async function criarReceita(req, res) {
  const {
    id_usuarios,
    nome,
    tempo_preparo_minutos,
    porcoes,
    modo_preparo,
    ingredientes,
    id_categorias,
  } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO receitas (id_usuarios, nome, tempo_preparo_minutos, porcoes, modo_preparo, ingredientes, id_categorias, criado_em, alterado_em) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [
        id_usuarios,
        nome,
        tempo_preparo_minutos,
        porcoes,
        modo_preparo,
        ingredientes,
        id_categorias,
      ]
    );
    res.status(201).json({ id: result.insertId, nome });
  } catch (error) {
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
