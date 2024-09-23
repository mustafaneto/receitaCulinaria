import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/cadastro-usuario',
      name: 'cadastroUsuario',
      component: () => import('../views/CadastroUsuarioView.vue')
    },
    {
      path: '/cadastro-receita',
      name: 'cadastroReceita',
      component: () => import('../views/CadastroReceitaView.vue')
    },
    {
      path: '/receitas/:id',
      name: 'receitaDetalhes',
      component: () => import('../views/ReceitaDetalhesView.vue')
    },
    {
      path: '/categoria/:id',
      name: 'categoriaReceitas',
      component: () => import('../views/CategoriaReceitasView.vue')
    },
    {
      path: '/resultado-busca/:nome',
      name: 'BuscaResultado',
      component: () => import('@/views/BuscaReceitaView.vue'),
    },
  ]
})


export default router
