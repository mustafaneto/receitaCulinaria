<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <form
      @submit.prevent="atualizarReceita"
      class="bg-white p-8 rounded shadow-md w-full max-w-4xl"
    >
      <h2 class="text-2xl font-bold mb-6 text-center">Editar Receita</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="col-span-1">
          <div class="mb-4">
            <label for="nome" class="form-label">Nome da Receita</label>
            <input
              type="text"
              id="nome"
              v-model="nome"
              required
              class="form-control"
            />
          </div>
          <div class="mb-4">
            <label for="tempo_preparo" class="form-label"
              >Tempo de Preparo (min)</label
            >
            <input
              type="number"
              id="tempo_preparo"
              v-model="tempoPreparo"
              class="form-control"
              required
            />
          </div>
          <div class="mb-4">
            <label for="porcoes" class="form-label">Porções</label>
            <input
              type="number"
              id="porcoes"
              v-model="porcoes"
              class="form-control"
              required
            />
          </div>

          <div class="mb-4">
            <label for="categoria" class="form-label">Categoria</label>
            <select
              id="categoria"
              v-model="categoria"
              class="form-control"
              required
            >
              <option disabled value="">Selecione uma categoria</option>
              <option
                v-for="categoria in categorias"
                :key="categoria.id"
                :value="categoria.id"
              >
                {{ categoria.nome }}
              </option>
            </select>
          </div>
        </div>

        <div class="col-span-1">
          <div class="mb-4">
            <label for="ingredientes" class="form-label">Ingredientes</label>
            <textarea
              id="ingredientes"
              v-model="ingredientes"
              class="form-control"
              required
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="modo_preparo" class="form-label">Modo de Preparo</label>
            <textarea
              id="modo_preparo"
              v-model="modoPreparo"
              class="form-control"
              required
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="url_imagem" class="form-label">URL da Imagem</label>
            <input
              type="text"
              id="url_imagem"
              v-model="urlImagem"
              class="form-control"
            />
          </div>
        </div>
      </div>


      <div class="flex flex-col items-center justify-center mt-6">
        <button
          type="submit"
          class="w-full md:w-1/3 bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition"
        >
          Atualizar Receita
        </button>
        <p class="mt-4 text-center text-gray-600">
          <router-link to="/gerenciar-receitas" class="text-blue-500"
            >Voltar</router-link
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useReceitasStore } from "@/stores/receitas";
import { useCategoriasStore } from "@/stores/categorias";

const nome = ref("");
const tempoPreparo = ref(0);
const porcoes = ref(0);
const ingredientes = ref("");
const modoPreparo = ref("");
const urlImagem = ref("");
const categoria = ref("");
const categorias = ref([]);

const receitasStore = useReceitasStore();
const categoriasStore = useCategoriasStore();

const router = useRouter();
const route = useRoute();

async function carregarCategorias() {
  try {
    categorias.value = await categoriasStore.fetchCategorias();
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
  }
}

async function carregarReceitaSelecionada() {
  const receitaId = route.params.id;
  try {
    const receita = await receitasStore.fetchReceitaById(receitaId); 
    if (receita) {
      nome.value = receita.nome;
      tempoPreparo.value = receita.tempo_preparo_minutos;
      porcoes.value = receita.porcoes;
      ingredientes.value = receita.ingredientes;
      modoPreparo.value = receita.modo_preparo;
      urlImagem.value = receita.url_imagem;
      categoria.value = receita.id_categorias;
    } else {
      console.error("Receita não encontrada");
    }
  } catch (error) {
    console.error("Erro ao buscar receita:", error);
  }
}

onMounted(async () => {
  await carregarCategorias();
  await carregarReceitaSelecionada();
});

// Função para atualizar a receita
const atualizarReceita = async () => {
  try {
    const receitaAtualizada = {
      id: route.params.id,
      nome: nome.value,
      tempo_preparo_minutos: tempoPreparo.value,
      porcoes: porcoes.value,
      url_imagem: urlImagem.value,
      modo_preparo: modoPreparo.value,
      ingredientes: ingredientes.value,
      id_categorias: categoria.value,
    };
    await receitasStore.atualizarReceita(receitaAtualizada);
    router.push("/gerenciar-receitas");
  } catch (error) {
    console.error("Erro ao atualizar receita:", error);
  }
};
</script>

<style scoped>
/* Estilo adicional se necessário */
</style>
