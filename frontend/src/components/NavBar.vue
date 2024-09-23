<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const router = useRouter();

function handleLogout() {
  authStore.logOut();
  router.push("/login");
}

defineProps({
  msg: {
    type: String,
    required: true,
  },
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

      <form class="d-flex" role="search">
        <input
          class="form-control me-2 focus:ring-2 focus:ring-green-500"
          type="search"
          placeholder="Search"
          aria-label="Search"
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
              <a @click="handleLogout" class="dropdown-item text-red-600 cursor-pointer">Sair</a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
