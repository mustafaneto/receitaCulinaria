<template>
  <div
    class="flex justify-between items-center bg-white p-4 rounded shadow mb-4"
  >
    <div class="flex items-center">
      <img
        class="w-16 h-16 object-cover rounded-full mr-4"
        :src="receita.url_imagem"
        alt="Imagem Receita"
      />
      <div>
        <h3 class="font-bold text-lg">{{ receita.nome }}</h3>
        <p class="text-gray-600">
          <span class="font-bold">Tempo de Preparo:</span>
          {{ receita.tempo_preparo_minutos }} min
        </p>
        <p class="text-gray-600">
          <span class="font-bold">Porções:</span> {{ receita.porcoes }}
        </p>
      </div>
    </div>

    <!-- Botões de ação -->
    <div class="flex space-x-4">
      <button
        @click="editarReceita"
        class="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
      >
        Editar
      </button>
      <button
        @click="abrirModalExclusao"
        class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
      >
        Excluir
      </button>
    </div>

    <ModalConfirmacao
      :isVisible="isModalVisible"
      :onConfirm="excluirReceita"
      :onCancel="fecharModalExclusao"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useReceitasStore } from '@/stores/receitas';
import ModalConfirmacao from '@/components/ModalConfirmacao.vue';

const props = defineProps({
  receita: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['receitaExcluida']);

const router = useRouter();
const receitasStore = useReceitasStore();

const isModalVisible = ref(false);

const abrirModalExclusao = () => {
  isModalVisible.value = true;
};

const fecharModalExclusao = () => {
  isModalVisible.value = false;
};

const editarReceita = () => {
  router.push({ name: "editarReceita", params: { id: props.receita.id } });
};

const excluirReceita = async () => {
  try {
    await receitasStore.excluirReceita(props.receita.id);
    fecharModalExclusao(); 
    emit('receitaExcluida', props.receita.id);
  } catch (error) {
  }
};
</script>

<style scoped></style>
