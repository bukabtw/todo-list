import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'tasks',
    component: () => import('../views/TasksView.vue'),
    meta: { title: 'Задачи' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'О проекте' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { title: 'Профиль' }
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('../views/StatsView.vue'),
    meta: { title: 'Статистика' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'Страница не найдена' }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
