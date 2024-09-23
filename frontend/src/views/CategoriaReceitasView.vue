<template>
  <div>
    <h2>Receitas da Categoria: {{ categoryName }}</h2>
    <div v-if="recipes.length">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardReceita
          v-for="recipe in recipes"
          :key="recipe.id"
          :receita="recipe"
        />
      </div>
    </div>
    <p v-else>Nenhuma receita encontrada nessa categoria.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useReceitasStore } from "@/stores/receitas";
import { useCategoriasStore } from "@/stores/categorias";
import CardReceita from "@/components/CardReceita.vue";

const route = useRoute();
const categoryId = ref(route.params.id);
const receitasStore = useReceitasStore();
const categoriasStore = useCategoriasStore();

const recipes = ref([]);
const categoryName = ref("");

async function fetchReceitas() {
  try {
    await receitasStore.fetchReceitasByCategory(categoryId.value);
    recipes.value = receitasStore.receitas;

    await categoriasStore.fetchCategorias();
    const category = categoriasStore.categorias.find(
      (cat) => cat.id === Number(categoryId.value)
    );
    if (category) {
      categoryName.value = category.nome;
    }
  } catch (error) {
    console.error("Erro ao carregar receitas:", error);
  }
}

onMounted(fetchReceitas);

watch(() => route.params.id, (newId) => {
  console.log(newId);
  categoryId.value = newId; 
  fetchReceitas();
});
</script>

<style scoped></style>
