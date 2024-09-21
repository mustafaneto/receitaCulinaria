import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    async logIn(login, senha) {
      try {
        const response = await fetch("http://localhost:3000/usuarios/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login, senha }),
        });

        if (!response.ok) {
          throw new Error("Erro ao fazer login");
        }

        const data = await response.json();
        console.log(data);

        this.isLoggedIn = true;
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
      }
    },
    async logOut() {
      try {
        await fetch("http://localhost:3000/usuarios/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        this.isLoggedIn = false;

        console.log("Logout com sucesso");
      } catch (error) {
        console.error("Erro ao sair:", error);
      }
    },
    async cadastro(userData) {
      try {
        const response = await fetch(
          "http://localhost:3000/usuarios/cadastrar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if (!response.ok) {
          throw new Error("Cadastro falhou");
        }

        const data = await response.json();
        console.log("Usuário registrado:", data);
      } catch (error) {
        console.error("Erro ao cadastrar:", error.response.data);
        throw new Error("Cadastro falhou");
      }
    },
  },
});
