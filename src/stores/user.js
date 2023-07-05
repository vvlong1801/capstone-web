import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { UserAPI } from '@/services';

export const useUserStore = defineStore('user', () => {
  const toast = useToast();
  const users = ref([]);

  const showToast = (type = 'success', title = 'Success', content = '') => {
    toast.add({
      severity: type,
      summary: title,
      detail: content,
      life: 3000
    });
  };

  const getUsersByKeyWord = async (keyword) => {
    try {
      const res = await UserAPI.onGetUserByKeyWord(keyword);
      users.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    users,
    getUsersByKeyWord
  };
});
