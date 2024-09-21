<script setup>
import { useAuthStore } from "./stores/auth";
import { RouterLink, RouterView, useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const fazerLogout = async () => {
  await authStore.logOut();
  router.push("/login");
};
</script>

<template>
  <header>
    <nav v-if="authStore.isLoggedIn" class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand">
          <img
            src="./assets/logo.png"
            alt="Logo"
            width="100"
            class="d-inline-block align-text-top"
          />
        </RouterLink>

        <button
          @click="fazerLogout"
          class="btn btn-primary border-black bg-red-500"
        >
          Sair
        </button>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
