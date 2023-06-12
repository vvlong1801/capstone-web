import './bootstrap';
import './assets/styles/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import { registerGlobalComponents } from './utils/import';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

registerGlobalComponents(app);
app.mount('#app');
