import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useReceitasStore = defineStore("receitas", {
  state: () => ({
    receitas: [],
  }),
  actions: {
    async cadastrarReceita(receita) {
      try {
        const token = useAuthStore().token;

        const response = await fetch("http://localhost:3000/receitas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(receita),
        });

        if (!response.ok) {
          throw new Error(`Falha ao cadastrar receita: ${response.statusText}`);
        }

        const data = await response.json();
        this.receitas.push(data);
      } catch (error) {
        console.error("Falha ao cadastrar receita:", error);
        throw error;
      }
    },

    async fetchReceitas() {
      try {
        const response = await fetch("http://localhost:3000/receitas", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Falha ao receber receita: ${response.statusText}`);
        }

        const data = await response.json();
        this.receitas = data;
      } catch (error) {
        console.error("Falha ao receber receita:", error);
      }
    },

    async fetchReceitaById(id) {
      try {
        const response = await fetch(`http://localhost:3000/receitas/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Falha ao receber receita: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Falha ao receber receita:", error);
        throw error;
      }
    },

    async fetchReceitasByCategory(categoryId) {
      try {
        const response = await fetch(
          `http://localhost:3000/receitas/categoria/${categoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Falha ao receber receitas da categoria: ${response.statusText}`
          );
        }

        const data = await response.json();
        this.receitas = data;
      } catch (error) {
        console.error("Falha ao receber receitas:", error);
      }
    },

    async fetchReceitasByFiltro(name) {
      try {
        const response = await fetch(`http://localhost:3000/receitas/busca/${name}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Falha ao receber receitas: ${response.statusText}`);
        }

        const data = await response.json();
        this.receitas = data;
      } catch (error) {
        console.error("Falha ao receber receitas:", error);
      }
    },
  },
});
