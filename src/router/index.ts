import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (to.hash) {
      return {
        el: to.hash,
        top: 84,
        behavior: reducedMotion ? 'auto' : 'smooth',
      }
    }

    return {
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
