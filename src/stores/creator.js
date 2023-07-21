import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CreatorAPI } from '@/services';
import { useToast } from 'primevue/usetoast';

export const useCreatorStore = defineStore('creator', () => {
  const listCreators = ref([]);
  const listRequests = ref([]);
  const listPersonalTrainers = ref([]);
  const toast = useToast();

  const getCreators = async () => {
    try {
      let res = await CreatorAPI.onGetCreators();
      listCreators.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getPersonalTrainers = async () => {
    try {
      let res = await CreatorAPI.onGetPersonalTrainers();
      listPersonalTrainers.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPersonalTrainerRequests = async () => {
    try {
      let res = await CreatorAPI.onGetPersonalTrainerRequests();
      listRequests.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPersonalTrainerRequestById = async (id) => {
    try {
      let res = await CreatorAPI.onGetPersonalTrainerRequestById(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPersonalTrainerById = async (id) => {
    try {
      let res = await CreatorAPI.onGetPersonalTrainerById(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPersonalTrainer = async (requestId, accept, message) => {
    try {
      let res = await CreatorAPI.onVerifyPersonalTrainer(requestId, { accept, message });
      toast.add({ severity: 'success', summary: 'success', detail: res?.message, life: 3000 });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    listCreators,
    listRequests,
    listPersonalTrainers,
    getCreators,
    getPersonalTrainerRequests,
    getPersonalTrainerRequestById,
    getPersonalTrainerById,
    getPersonalTrainers,
    verifyPersonalTrainer
  };
});
