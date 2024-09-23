<template>
  <div>
    <div class="p-4 max-w-lg flex flex-col m-auto bg-white rounded">
      <h2 class="text-2xl font-bold mb-6">{{ receita.nome }}</h2>
      <p>
        <strong>Tempo de Preparo:</strong> {{ receita.tempo_preparo_minutos }} min
      </p>
      <p><strong>Porções:</strong> {{ receita.porcoes }}</p>
      <p><strong>Ingredientes:</strong></p>
      <p>{{ receita.ingredientes }}</p>
      <p><strong>Modo de Preparo:</strong></p>
      <p>{{ receita.modo_preparo }}</p>
      <div class="mt-4 m-auto">
        <img
          :src="receita.url_imagem"
          alt="Imagem da receita"
          class="h-auto max-w-md rounded-3xl"
        />
      </div>
      <div class="flex flex-col items-center">
        <router-link
          to="/"
          class="mt-4 inline-block bg-gray-200 text-black font-bold py-2 px-4 rounded"
        >
          Voltar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useReceitasStore } from "@/stores/receitas";

const route = useRoute();
const receitasStore = useReceitasStore();
const receita = ref({});

onMounted(async () => {
  await carregarReceita();
});

const carregarReceita = async () => {
  const id = route.params.id;
  try {
    receita.value = await receitasStore.fetchReceitaById(id);
  } catch (error) {
    console.error("Erro ao carregar receita:", error);
  }
};
</script>

<style scoped></style>
