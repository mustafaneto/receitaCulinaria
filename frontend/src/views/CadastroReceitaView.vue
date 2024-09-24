<template>
  <div class="flex items-start justify-center h-screen bg-gray-100">
    <form
      @submit.prevent="cadastrarReceita"
      class="bg-white p-8 rounded shadow-md w-full max-w-4xl my-3"
    >
      <h2 class="text-2xl font-bold mb-6 text-center w-full">
        Registrar Receita
      </h2>

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

      <!-- Submit button centered under the form -->
      <div class="flex justify-center mt-6">
        <button
          type="submit"
          class="w-full md:w-1/3 bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
        >
          Registrar Receita
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
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

onMounted(async () => {
  try {
    categorias.value = await categoriasStore.fetchCategorias();
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
  }
});

const cadastrarReceita = async () => {
  try {
    await receitasStore.cadastrarReceita({
      nome: nome.value,
      tempo_preparo_minutos: tempoPreparo.value,
      porcoes: porcoes.value,
      url_imagem: urlImagem.value,
      modo_preparo: modoPreparo.value,
      ingredientes: ingredientes.value,
      id_categorias: categoria.value,
    });
    router.push("/");
  } catch (error) {
    console.error("Falha ao cadastrar receita:", error);
  }
};
</script>

<style scoped></style>
