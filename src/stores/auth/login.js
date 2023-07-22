import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useAuthStore } from './auth';
import { useToast } from 'primevue/usetoast';

export const useLoginStore = defineStore('login', () => {
  const toast = useToast();
  const auth = useAuthStore();
  const errors = reactive({});
  const loading = ref(false);

  const form = reactive({
    email: '',
    password: '',
    remember: false
  });

  function resetForm() {
    form.email = '';
    form.password = '';
    form.remember = false;
  }

  async function handleSubmit() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    return window.axios
      .post(`${import.meta.env.VITE_BASE_URL}/creator/login`, form)
      .then((res) => {
        auth.login(res?.data.access_token, res.data);
      })
      .catch((err) => {
        toast.add({
          severity: 'error',
          summary: 'error',
          detail: err.response.data.message,
          life: 3000
        });
      })
      .finally(() => {
        form.password = '';
        loading.value = false;
      });
  }

  return { form, errors, loading, resetForm, handleSubmit };
});
