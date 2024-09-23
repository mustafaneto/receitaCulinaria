const pool = require('../conexao');
const Receita = require('../models/receitaModel');

class ReceitaRepository {
  async criar(id_usuarios, nome, tempo_preparo_minutos, porcoes, url_imagem, modo_preparo, ingredientes, id_categorias) {
    const [result] = await pool.query(
      "INSERT INTO receitas (id_usuarios, nome, tempo_preparo_minutos, porcoes, url_imagem, modo_preparo, ingredientes, id_categorias, criado_em, alterado_em) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [id_usuarios, nome, tempo_preparo_minutos, porcoes, url_imagem, modo_preparo, ingredientes, id_categorias]
    );
    return new Receita(result.insertId, id_usuarios, nome, tempo_preparo_minutos, porcoes, url_imagem, modo_preparo, ingredientes, id_categorias, new Date(), new Date());
  }

  async buscarTodas() {
    const [rows] = await pool.query("SELECT * FROM receitas");
    return rows.map(row => new Receita(row.id, row.id_usuarios, row.nome, row.tempo_preparo_minutos, row.porcoes, row.url_imagem, row.modo_preparo, row.ingredientes, row.id_categorias, row.criado_em, row.alterado_em));
  }

  async buscarPorId(id) {
    const [rows] = await pool.query("SELECT * FROM receitas WHERE id = ?", [id]);
    if (rows.length > 0) {
      const row = rows[0];
      return new Receita(row.id, row.id_usuarios, row.nome, row.tempo_preparo_minutos, row.porcoes, row.url_imagem, row.modo_preparo, row.ingredientes, row.id_categorias, row.criado_em, row.alterado_em);
    }
    return null;
  }

  async buscarPorIdUsario(id) {
    const [rows] = await pool.query("SELECT * FROM receitas WHERE id_usuarios = ?", [id]);
    return rows.map(row => new Receita(row.id, row.id_usuarios, row.nome, row.tempo_preparo_minutos, row.porcoes, row.url_imagem, row.modo_preparo, row.ingredientes, row.id_categorias, row.criado_em, row.alterado_em));
  }

  async buscarPorCategoria(id_categoria) {
    const [rows] = await pool.query("SELECT * FROM receitas WHERE id_categorias = ?", [id_categoria]);
    return rows.map(row => new Receita(row.id, row.id_usuarios, row.nome, row.tempo_preparo_minutos, row.porcoes, row.url_imagem, row.modo_preparo, row.ingredientes, row.id_categorias, row.criado_em, row.alterado_em));
  }

  async buscarPorFiltro(busca) {
    const [rows] = await pool.query("SELECT * FROM receitas WHERE nome LIKE ?", [`%${busca}%`]);
    return rows.map(row => new Receita(row.id, row.id_usuarios, row.nome, row.tempo_preparo_minutos, row.porcoes, row.url_imagem, row.modo_preparo, row.ingredientes, row.id_categorias, row.criado_em, row.alterado_em));
  }

  async editar(id, id_usuarios, nome, tempo_preparo_minutos, porcoes, url_imagem, modo_preparo, ingredientes, id_categorias) {
    
    const [result] = await pool.query(
      "UPDATE receitas SET nome = ?, tempo_preparo_minutos = ?, porcoes = ?, url_imagem = ?, modo_preparo = ?, ingredientes = ?, id_categorias = ?, alterado_em = NOW() WHERE id = ? AND id_usuarios = ?",
      [nome, tempo_preparo_minutos, porcoes, url_imagem, modo_preparo, ingredientes, id_categorias, id, id_usuarios]
    );
  
    if (result.affectedRows === 0) {
      return null;
    }
  
    return new Receita(id, id_usuarios, nome, tempo_preparo_minutos, porcoes, url_imagem, modo_preparo, ingredientes, id_categorias, null, new Date());
  }

  async excluir(id) {
    const [result] = await pool.query("DELETE FROM receitas WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new ReceitaRepository();
