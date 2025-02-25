import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta?.auth) {
    const auth = useAuth()

    if (auth.token && auth.user) {
      const isAuthenticated = auth.checkToken()

      if (isAuthenticated) {
        next()
      } else {
        next({ name: 'login' })
      }
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
