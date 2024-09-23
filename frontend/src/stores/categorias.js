import { defineStore } from 'pinia';

export const useCategoriasStore = defineStore('categorias', {
  state: () => ({
    categorias: [],
  }),
  
  actions: {
    async fetchCategorias() {
      try {
        const response = await fetch('http://localhost:3000/categorias'); 
        if (!response.ok) {
          throw new Error('Erro ao buscar categorias');
        }
        const data = await response.json();
        this.categorias = data;
        return this.categorias;
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        throw error;
      }
    }
  }
});
