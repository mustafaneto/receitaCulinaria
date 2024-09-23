class Receita {
    constructor(id, id_usuarios, nome, tempo_preparo_minutos, porcoes, url_imagem, modo_preparo, ingredientes, id_categorias, criado_em, alterado_em) {
      this.id = id;
      this.id_usuarios = id_usuarios;
      this.nome = nome;
      this.tempo_preparo_minutos = tempo_preparo_minutos;
      this.porcoes = porcoes;
      this.url_imagem = url_imagem;
      this.modo_preparo = modo_preparo;
      this.ingredientes = ingredientes;
      this.id_categorias = id_categorias;
      this.criado_em = criado_em;
      this.alterado_em = alterado_em;
    }
  }
  
  module.exports = Receita;
  