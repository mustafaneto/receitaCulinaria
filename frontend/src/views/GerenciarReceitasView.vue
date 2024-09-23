<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-6 text-center">Gerenciar Receitas</h2>
    <div class="space-y-4">
      <div v-if="receitas.length > 0">
        <CardReceitaEdit
          v-for="receita in receitas"
          :key="receita.id"
          :receita="receita"
          @receitaExcluida="removerReceita"
        />
      </div>
      <div v-else class="text-center text-3xl">Nenhuma receita cadastrada.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useReceitasStore } from "@/stores/receitas";
import CardReceitaEdit from "@/components/CardReceitaEdit.vue";

const receitasStore = useReceitasStore();
const receitas = ref([]);

onMounted(async () => {
  await carregarReceitas();
});

const carregarReceitas = async () => {
  try {
    await receitasStore.fetchReceitasByUser();
    receitas.value = receitasStore.receitas;
  } catch (error) {
    console.error("Erro ao carregar receitas:", error);
  }
};

const removerReceita = (id) => {
  receitas.value = receitas.value.filter((receita) => receita.id !== id);
};
</script>

<style scoped></style>
