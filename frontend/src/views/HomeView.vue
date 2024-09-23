<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-6 text-center">Lista de Receitas</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CardReceita
        v-for="receita in receitas"
        :key="receita.id"
        :receita="receita"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useReceitasStore } from "@/stores/receitas";
import CardReceita from "@/components/CardReceita.vue"; 

const receitasStore = useReceitasStore();
const receitas = ref([]);

onMounted(async () => {
  await carregarReceitas();
});

const carregarReceitas = async () => {
  try {
    await receitasStore.fetchReceitas();
    receitas.value = receitasStore.receitas;
  } catch (error) {
    console.error("Erro ao carregar receitas:", error);
  }
};

const verDetalhes = (id) => {
  router.push({ name: "receitaDetalhes", params: { id } });
};
</script>

<style scoped></style>
