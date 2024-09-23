const jwt = require("jsonwebtoken");
const receitaRepository = require("../repositories/receitaRepository");

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

    const receita = await receitaRepository.criar(
      id_usuarios,
      nome,
      tempo_preparo_minutos,
      porcoes,
      url_imagem,
      modo_preparo,
      ingredientes,
      id_categorias
    );

    res.status(201).json(receita);
  } catch (error) {
    console.error("Erro ao criar receitas:", error);
    res.status(500).json({ error: "Erro ao criar receita" });
  }
}

async function buscarReceitas(req, res) {
  try {
    const receitas = await receitaRepository.buscarTodas();
    res.json(receitas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar receitas" });
  }
}

async function buscarReceitaPorId(req, res) {
  const { id } = req.params;

  try {
    const receita = await receitaRepository.buscarPorId(id);

    if (!receita) {
      return res.status(404).json({ error: "Receita não encontrada" });
    }

    res.json(receita);
  } catch (error) {
    console.error("Erro ao buscar receita:", error);
    res.status(500).json({ error: "Erro ao buscar receita" });
  }
}

async function buscarReceitaPorIdUsuario(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id_usuarios = decoded.id;
    const receitas = await receitaRepository.buscarPorIdUsario(id_usuarios);
    
    if (!receitas) {
      return res.status(404).json({ error: "Receitas não encontradas" });
    }

    res.json(receitas);
  } catch (error) {
    console.error("Erro ao buscar receita:", error);
    res.status(500).json({ error: "Erro ao buscar receita" });
  }
}

async function buscarReceitasPorCategoria(req, res) {
  const { id } = req.params;

  try {
    const receitas = await receitaRepository.buscarPorCategoria(id);
    res.json(receitas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar receitas" });
  }
}

async function buscarReceitaPorFiltro(req, res) {
  const { busca } = req.params;

  try {
    const receitas = await receitaRepository.buscarPorFiltro(busca);
    res.json(receitas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar receitas" });
  }
}

async function editarReceita(req, res) {
  const { id } = req.params;
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

    const receita = await receitaRepository.editar(
      id,
      id_usuarios,
      nome,
      tempo_preparo_minutos,
      porcoes,
      url_imagem,
      modo_preparo,
      ingredientes,
      id_categorias
    );

    if (!receita) {
      return res.status(404).json({ error: "Receita não encontrada" });
    }

    res.json(receita);
  } catch (error) {
    console.error("Erro ao editar receita:", error);
    res.status(500).json({ error: "Erro ao editar receita" });
  }
}

async function excluirReceita(req, res) {
  const { id } = req.params;

  try {
    const receita = await receitaRepository.excluir(id);

    if (!receita) {
      return res.status(404).json({ error: "Receita não encontrada" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Erro ao excluir receita:", error);
    res.status(500).json({ error: "Erro ao excluir receita" });
  }
}

module.exports = {
  criarReceita,
  buscarReceitas,
  buscarReceitaPorId,
  buscarReceitaPorIdUsuario,
  buscarReceitasPorCategoria,
  buscarReceitaPorFiltro,
  editarReceita,
  excluirReceita,
};
