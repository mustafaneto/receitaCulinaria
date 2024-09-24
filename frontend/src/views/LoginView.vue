<template>
  <div class="flex items-start justify-center h-screen bg-gray-100">
    <form
      @submit.prevent="loginUsuario"
      class="bg-white p-8 rounded shadow-lg w-96 m-auto my-3"
    >
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <p v-if="erroMensagem" class="text-red-500 text-center mb-4">
        {{ erroMensagem }}
      </p>

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
        Entrar
      </button>
      <p class="mt-4 text-center text-gray-600">
        Não tem uma conta?
        <RouterLink to="/cadastro-usuario" class="text-blue-500"
          >Registrar</RouterLink
        >
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { RouterLink, useRouter } from "vue-router";

const login = ref("");
const senha = ref("");
const authStore = useAuthStore();
const router = useRouter();
const erroMensagem = ref("");

const loginUsuario = async () => {
  erroMensagem.value = "";
  try {
    await authStore.logIn(login.value, senha.value);
    router.push("/");
  } catch (error) {
    erroMensagem.value = "Login ou senha incorretos. Tente novamente.";
  }
};
</script>

<style scoped></style>
