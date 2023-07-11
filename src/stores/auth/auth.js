import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { setAxiosBaseUrl } from '@/utils/utilities.js';

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

    setAxiosBaseUrl(user.role);
    router.push({ name: 'dashboard' });
  }

  function destroyTokenAndRedirectTo(routeName) {
    setAccessToken(null);
    router.push({ name: routeName });
  }

  async function logout() {
    await window.axios
      .post('logout')
      .then(() => {
        console.log('logout success');
        localStorage.setItem('user_info', {});
        destroyTokenAndRedirectTo('login');
      })
      .finally(() => {
        router.push('/auth/login');
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
