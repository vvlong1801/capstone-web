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
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue')
        },
        {
          path: '/muscles',
          name: 'muscle',
          component: () => import('@/views/muscle/IndexView.vue')
        },
        {
          path: '/equipments',
          name: 'equipment',
          component: () => import('@/views/equipment/IndexView.vue')
        },
        //==============exercise================
        {
          path: '/exercises',
          name: 'exercise.index',
          component: () => import('@/views/exercise/IndexView.vue')
        },
        {
          path: '/exercises/create',
          name: 'exercise.create',
          component: () => import('@/views/exercise/CreateView.vue')
        },
        {
          path: '/exercises/:id/edit',
          name: 'exercise.edit',
          component: () => import('@/views/exercise/EditView.vue')
        },
        {
          path: '/exercises/:id',
          name: 'exercise.show',
          component: () => import('@/views/exercise/DetailView.vue')
        },
        //==============challenge================
        {
          path: '/challenges',
          name: 'challenges.index',
          component: () => import('@/views/challenge/IndexView.vue')
        },
        {
          path: '/challenges/create',
          name: 'challenges.create',
          component: () => import('@/views/challenge/CreateView.vue')
        },
        {
          path: '/challenges/:id/edit',
          name: 'challenges.edit',
          component: () => import('@/views/challenge/EditView.vue')
        },
        {
          path: '/challenges/:id',
          name: 'challenges.show',
          component: () => import('@/views/challenge/DetailView.vue')
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
