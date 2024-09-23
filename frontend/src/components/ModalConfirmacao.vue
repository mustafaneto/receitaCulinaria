<template>
    <div
      v-if="isVisible"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div class="bg-white rounded shadow-lg p-4 w-96">
        <h3 class="font-bold text-lg">Confirmar Exclusão</h3>
        <p class="mt-2">Você tem certeza que deseja excluir esta receita?</p>
        <div class="mt-4 flex justify-end">
          <button @click="cancelar" class="mr-2 bg-gray-300 text-black py-1 px-3 rounded">
            Cancelar
          </button>
          <button @click="confirmar" class="bg-red-500 text-white py-1 px-3 rounded">
            Excluir
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    isVisible: {
      type: Boolean,
      required: true,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
      required: true,
    }
  });
  
  const cancelar = () => {
    props.onCancel();
  };
  
  const confirmar = () => {
    props.onConfirm();
  };
  </script>
  
  <style scoped>
  </style>
  