import './bootstrap';
import './assets/styles/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';

import { registerGlobalComponents } from './utils/import';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);

registerGlobalComponents(app);
app.mount('#app');
