import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { ProfileAPI } from '@/services';
import { useAuthStore } from '@/stores/auth/auth';

export const useProfileStore = defineStore('profile', () => {
  const toast = useToast();
  const form = ref({ user: { email: '', name: '', phone_number: '' }, age: 18 });
  const authStore = useAuthStore();
  const issuerOptions = ref();
  const techniqueOptions = ref();

  const getProfile = async () => {
    try {
      const res = await ProfileAPI.onGetProfile();
      form.value = res.data;
      form.value.techniques = form.value.techniques.map((te) => te.id);
      // form.value.certificate_issuer = form.value.certificate_issuer?.id;
      authStore.userInfo = form.value.user;
      authStore.creatorInfo = { is_PT: form.value.verified_pt, rate: form.value.rate };
    } catch (error) {
      console.log(error);
    }
  };

  const getIssuers = async () => {
    try {
      const res = await ProfileAPI.onGetIssuers();
      issuerOptions.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getTechniques = async () => {
    try {
      const res = await ProfileAPI.onGetTechniques();
      techniqueOptions.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      console.log(form.value);
      const res = await ProfileAPI.onUpdateProfile(form.value);
      if (res?.status === 204 || res?.status === 200) {
        toast.add({ severity: 'success', summary: 'success', detail: res?.message, life: 3000 });
      } else {
        throw Error("server doesn't response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestBecamePersonalTrainer = async () => {
    try {
      const res = await ProfileAPI.onRequestBecamePersonalTrainer(form.value);
      if (res?.status === 204 || res?.status === 200) {
        toast.add({ severity: 'success', summary: 'success', detail: res?.message, life: 3000 });
      } else {
        throw Error("server doesn't response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    form,
    issuerOptions,
    techniqueOptions,
    getProfile,
    updateProfile,
    getIssuers,
    getTechniques,
    requestBecamePersonalTrainer
  };
});
