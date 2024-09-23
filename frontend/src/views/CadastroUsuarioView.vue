<template>
  <div>
    <form
      @submit.prevent="cadastrarUsuario"
      class="bg-white p-8 rounded shadow-lg w-96 m-auto"
    >
      <h2 class="text-2xl font-bold mb-6 text-center">Cadastro</h2>
      <div class="mb-4">
        <label for="nome" class="form-label">Nome</label>
        <input
          type="text"
          id="nome"
          v-model="nome"
          required
          class="form-control"
        />
      </div>
      <div class="mb-4">
        <label for="login" class="form-label">Login</label>
        <input
          type="text"
          id="login"
          v-model="login"
          required
          class="form-control"
        />
      </div>
      <div class="mb-4">
        <label for="senha" class="form-label">Senha</label>
        <input
          type="password"
          id="senha"
          v-model="senha"
          required
          class="form-control"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
      >
        Registrar
      </button>
      <p class="mt-4 text-center text-gray-600">
        Já tem uma conta?
        <router-link to="/login" class="text-blue-500">Login</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const nome = ref("");
const login = ref("");
const senha = ref("");

const cadastrarUsuario = async () => {
  try {
    await authStore.cadastro({
      nome: nome.value,
      login: login.value,
      senha: senha.value,
    });
    router.push("/login");
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
</script>

<style scoped>
</style>
