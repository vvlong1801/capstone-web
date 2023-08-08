import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';

export const useTagStore = defineStore('tag', () => {
  const toast = useToast();
  const tags = ref([]);

  const form = reactive({
    name: '',
    type: '',
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


  const getTags = () => {
    return window.axios
      .get('tags')
      .then((res) => {
        tags.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createTag = () => {
    return window.axios
      .post('tags', form)
      .then((res) => {
        getTags();
        showToast('success', res.message);
      })
      .catch((err) => {
        showToast('error', err.message);
      })
      .finally(resetForm);
  };


  function deleteTag(id) {
    return window.axios
      .delete(`tags/${id}`)
      .then((res) => {
        getTags();
        showToast('success', res.message);
      })
      .catch((err) => {
        showToast('error', err.message);
      });
  }

  return {
    form,
    resetForm,
    tags,
    getTags,
    createTag,
    deleteTag
  };
});
