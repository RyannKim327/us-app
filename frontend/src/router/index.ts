import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/index.vue'
import Login from '../pages/login.vue'
import Register from '../pages/register.vue'
import Chat from '../pages/chat.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
