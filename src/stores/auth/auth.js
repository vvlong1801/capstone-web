import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const accessToken = useStorage('access_token', '');
  const userInfo = useStorage('user_info', {});
  const check = computed(() => !!accessToken.value);
  const isAdmin = computed(
    () => userInfo.value.role == 'admin' || userInfo.value.role == 'superAdmin'
  );
  const isSuperAdmin = computed(() => userInfo.value.role == 'superAdmin');

  function setAccessToken(value) {
    accessToken.value = value;
    window.axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`;
  }

  function login(accessToken, user) {
    setAccessToken(accessToken);
    userInfo.value = user;

    if (user.role == 'admin' || user.role == 'superAdmin') {
      window.axios.defaults.baseURL = import.meta.env.VITE_BASE_URL + '/admin';
    } else if (user.role == 'creator') {
      window.axios.defaults.baseURL = import.meta.env.VITE_BASE_URL + '/creator';
    }

    router.push({ name: 'dashboard' });
  }

  function destroyTokenAndRedirectTo(routeName) {
    setAccessToken(null);
    router.push({ name: routeName });
  }

  async function logout() {
    return window.axios.post('logout').finally(() => {
      userInfo.value = {};
      destroyTokenAndRedirectTo('login');
    });
  }

  return {
    accessToken,
    login,
    logout,
    check,
    destroyTokenAndRedirectTo,
    isAdmin,
    isSuperAdmin,
    userInfo
  };
});
