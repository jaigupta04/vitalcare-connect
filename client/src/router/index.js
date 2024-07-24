import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: () => import('../App.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/appointment',
      name: 'appointment',
      component: () => import('../views/Appointment.vue')
    }
  ]
})

export default router
