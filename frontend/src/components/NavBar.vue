<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCategoriasStore } from "@/stores/categorias";
import { useReceitasStore } from "@/stores/receitas";
import { ref, onMounted } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const categoriasStore = useCategoriasStore();
const receitasStore = useReceitasStore();

const searchQuery = ref("");

async function searchRecipes() {
  if (searchQuery.value.trim() === "") return;

  try {
    await receitasStore.fetchReceitasByFiltro(searchQuery.value);
    router.push(`/resultado-busca/${searchQuery.value}`);
    searchQuery.value = "";
  } catch (error) {
    console.error("Erro ao buscar receitas:", error);
  }
}

function handleLogout() {
  authStore.logOut();
  router.push("/login");
}

onMounted(async () => {
  await categoriasStore.fetchCategorias();
});
</script>

<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">
        <img
          src="../assets/logo.png"
          alt="Logo"
          width="100"
          class="d-inline-block align-text-top"
        />
      </RouterLink>

      <form class="d-flex" role="search" @submit.prevent="searchRecipes">
        <input
          class="form-control me-2 focus:ring-2 focus:ring-green-500"
          type="search"
          placeholder="Pizza de Calabresa..."
          aria-label="Search"
          v-model="searchQuery"
        />
        <button class="btn btn-outline-success" type="submit">Procurar</button>
      </form>

      <div class="dropdown user-menu">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="userMenu"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-person-circle"></i>
        </button>

        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
          <div v-if="!authStore.isLoggedIn">
            <li>
              <RouterLink to="/login" class="dropdown-item">Login</RouterLink>
            </li>
            <li>
              <RouterLink to="/cadastro-usuario" class="dropdown-item"
                >Cadastro</RouterLink
              >
            </li>
          </div>
          <div v-else>
            <li>
              <RouterLink to="/cadastro-receita" class="dropdown-item"
                >Criar Receita</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/editar-receita" class="dropdown-item"
                >Editar Receita</RouterLink
              >
            </li>
            <li>
              <a
                @click="handleLogout"
                class="dropdown-item text-red-600 cursor-pointer"
                >Sair</a
              >
            </li>
          </div>
        </ul>
      </div>
    </div>
    <div class="navbar-collapse">
      <ul class="navbar-nav d-flex flex-row me-auto justify-around">
        <li
          class="nav-item"
          v-for="category in categoriasStore.categorias"
          :key="category.id"
        >
          <RouterLink
            :to="`/categoria/${category.id}`"
            class="nav-link font-semibold mx-7 text-center"
          >
            {{ category.nome }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar-nav {
  margin-top: 1rem;
}
</style>
