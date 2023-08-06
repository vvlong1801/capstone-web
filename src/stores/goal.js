import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';

export const useGoalStore = defineStore('goal', () => {
  const toast = useToast();
  const goals = ref([]);

  const form = reactive({
    name: '',
    tags: [],
  });

  const showToast = (type = 'success', title = 'Success', content = '') => {
    toast.add({
      severity: type,
      summary: title,
      detail: content,
      life: 3000
    });
  };

  const resetForm = () => {
    form.name = '';
    form.type = null;
  };


  const getGoals = () => {
    return window.axios
      .get('goals')
      .then((res) => {
        goals.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createGoal = () => {
    return window.axios
      .post('goals', form)
      .then((res) => {
        getGoals();
        showToast('success', res.message);
      })
      .catch((err) => {
        showToast('error', err.message);
      })
      .finally(resetForm);
  };


  function deleteGoal(id) {
    return window.axios
      .delete(`goals/${id}`)
      .then((res) => {
        getGoals();
        showToast('success', res.message);
      })
      .catch((err) => {
        showToast('error', err.message);
      });
  }

  return {
    form,
    resetForm,
    goals,
    getGoals,
    createGoal,
    deleteGoal
  };
});
