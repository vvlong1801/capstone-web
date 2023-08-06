import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';

export const useCertificateStore = defineStore('certificate', () => {
  const toast = useToast();
  const certificates = ref([]);

  const form = reactive({
    name: '',
    example: null,
    description: ''
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
    form.example = null;
    form.description = '';
  };


  const getCertificates = () => {
    return window.axios
      .get('certificates')
      .then((res) => {
        certificates.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createCertificate = () => {
    return window.axios
      .post('certificates', form)
      .then((res) => {
        getCertificates();
        showToast('success', res.message);
      })
      .catch((err) => {
        showToast('error', err.message);
      })
      .finally(resetForm);
  };

  function lockCertificate(id) {
    return window.axios
      .put(`certificates/${id}/lock`)
      .then((res) => {
        getCertificates();
        showToast('success', res.message);
      })
      .catch((err) => {
        showToast('error', err.message);
      });
  }

  function unlockCertificate(id) {
    return window.axios
      .put(`certificates/${id}/unlock`)
      .then((res) => {
        getCertificates();
        showToast('success', res.message);
      })
      .catch((err) => {
        showToast('error', err.message);
      });
  }

  function deleteCertificate(id) {
    return window.axios
      .delete(`certificates/${id}`)
      .then((res) => {
        getCertificates();
        showToast('success', res.message);
      })
      .catch((err) => {
        showToast('error', err.message);
      });
  }

  return {
    form,
    resetForm,
    certificates,
    getCertificates,
    createCertificate,
    lockCertificate,
    unlockCertificate,
    deleteCertificate
  };
});
