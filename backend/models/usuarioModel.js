class Usuario {
    constructor(id, nome, login, senha, criado_em, alterado_em) {
      this.id = id;
      this.nome = nome;
      this.login = login;
      this.senha = senha;
      this.criado_em = criado_em;
      this.alterado_em = alterado_em;
    }
  }
  
  module.exports = Usuario;
  