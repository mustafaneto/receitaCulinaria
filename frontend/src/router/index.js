import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/cadastro-usuario',
      name: 'cadastro-usuario',
      component: () => import('../views/CadastroUsuarioView.vue')
    },
    {
      path: '/cadastro-receita',
      name: 'cadastro-receita',
      component: () => import('../views/CadastroReceitaView.vue')
    },
  ]
})


export default router
