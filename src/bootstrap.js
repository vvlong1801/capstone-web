import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { setAxiosBaseUrl } from '@/utils/utilities.js';

import { useStorage } from '@vueuse/core';

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = import.meta.env.VITE_BASE_URL + '/creator';

const accessToken = useStorage('access_token', '');
const user = localStorage.getItem('user_info');

setAxiosBaseUrl(JSON.parse(user)?.role);

window.axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`;

window.axios.interceptors.response.use(
  (response) => response.data,
  (err) => {
    if (err.response?.status === 401) {
      accessToken.value = null;
      axios.defaults.headers.common['Authorization'] = 'Bearer';
      // eslint-disable-next-line no-undef
      redirect('/auth/login');
    }
    return Promise.reject(err);
  }
);

window.Pusher = Pusher;

// TODO: Revert this code
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  bearerToken: accessToken.value,
  // authEndpoint: 'http://192.168.1.232:8000/api/broadcasting/auth'
  // authEndpoint: 'http://54.255.135.59/api/broadcasting/auth'
  authEndpoint: 'http://localhost:8000/api/broadcasting/auth'
  // authEndpoint: 'http://192.168.1.218:8000/api/broadcasting/auth'
});
console.log(window.Echo);
