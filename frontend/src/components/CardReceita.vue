<template>
    <div class="bg-white p-4 rounded shadow-lg flex flex-col justify-center items-center">
      <h3 class="font-bold text-lg">{{ receita.nome }}</h3>
      <img class="max-w-md rounded-3xl" :src="receita.url_imagem" alt="imagem receita">
      <div>
        <p class="text-gray-600">
          <span class="font-bold">Tempo de Preparo:</span> {{ receita.tempo_preparo_minutos }} min
        </p>
        <p class="text-gray-600">
          <span class="font-bold">Porções:</span> {{ receita.porcoes }}
        </p>
        <p class="text-gray-600 mb-4" v-if="receita.ingredientes.length > 50">
          {{ receita.ingredientes.substring(0, 50) }}...
        </p>
        <p class="text-gray-600 mb-4" v-else>
          {{ receita.ingredientes }}
        </p>
      </div>
      <button
        @click="verDetalhes"
        class="bg-blue-500 text-white font-bold py-1 px-4 rounded hover:bg-blue-600 transition"
      >
        Ver Detalhes
      </button>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { useRouter } from 'vue-router';
  
  const props = defineProps({
    receita: {
      type: Object,
      required: true
    }
  });
  
  const router = useRouter();
  
  const verDetalhes = () => {
    router.push({ name: "receitaDetalhes", params: { id: props.receita.id } });
  };
  </script>
  
  <style scoped>
  </style>
  