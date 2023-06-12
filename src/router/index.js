import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layouts/AppLayout.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const guest = (to, from, next) => {
  if (localStorage.getItem('access_token')) {
    return next({ name: 'dashboard' });
  }
  next();
};

const auth = (to, from, next) => {
  if (!localStorage.getItem('access_token')) {
    return next({ name: 'login' });
  }
  next();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      beforeEnter: auth,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue')
        }
      ]
    },
    {
      path: '/',
      component: GuestLayout,
      beforeEnter: guest,
      children: [
        {
          path: '/auth/login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue')
        }
      ]
    }
  ]
});

export default router;
