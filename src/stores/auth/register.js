import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

export const useRegisterStore = defineStore('register', () => {
  const router = useRouter();
  const toast = useToast();

  const loading = ref(false);
  const verifyEmail = ref('');
  const readTerm = ref(false);

  const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  function resetForm() {
    form.name = '';
    form.email = '';
    form.password = '';
    form.password_confirmation = '';
  }

  async function handleSubmit() {
    if (loading.value) return;

    loading.value = true;

    return window.axios
      .post('register', form)
      .then((res) => {
        if (res.status == 204) {
          verifyEmail.value = formatVerifyEmail(form.email);
          toast.add({
            severity: 'success',
            summary: 'register account success',
            detail: res.message,
            life: 3000
          });
          router.push('/auth/verify');
        }
        if (res.status == 500) {
          toast.add({
            severity: 'error',
            summary: 'error submit',
            detail: res.message,
            life: 3000
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        form.password = '';
        form.confirm_password = '';
        loading.value = false;
      });
  }

  function formatVerifyEmail(email) {
    const atIndex = email.indexOf('@');
    const username = email.substring(0, atIndex);
    const convertedEmail = username.substring(0, 2) + '**' + email.substring(atIndex);
    return convertedEmail;
  }

  return { form, verifyEmail, readTerm, loading, resetForm, handleSubmit };
});
