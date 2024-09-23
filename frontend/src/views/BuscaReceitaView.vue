<template>
  <div>
    <h2>Resultados da Busca para "{{ query }}"</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CardReceita
        v-for="receita in receitas"
        :key="receita.id"
        :receita="receita"
      />
    </div>
    <div v-if="receitas.length === 0">
      <p>Nenhuma receita encontrada.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useReceitasStore } from "@/stores/receitas";
import CardReceita from "@/components/CardReceita.vue";

const route = useRoute();
const receitasStore = useReceitasStore();
const receitas = ref([]);

const query = ref(route.params.nome);

watch(() => route.params.nome, (newNome) => {
  query.value = newNome; 
  fetchReceitas();
});

const fetchReceitas = async () => {
  if (query.value) {
    try {
      await receitasStore.fetchReceitasByFiltro(query.value);
      receitas.value = receitasStore.receitas;
    } catch (error) {
      console.error("Erro ao carregar receitas:", error);
    }
  }
};

onMounted(fetchReceitas);
</script>
