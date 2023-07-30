import { defineStore } from 'pinia';
import { ref } from 'vue';
import { DashboardAPI } from '@/services';

export const useDashboardStore = defineStore('dashboard', () => {
  const data = ref();

  const getAnalysis = async () => {
    try {
      const res = await DashboardAPI.onGetAnalysis();
      data.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    data,
    getAnalysis
  };
});
