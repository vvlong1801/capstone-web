import { ref, readonly } from 'vue';
import { useToast } from 'primevue/usetoast';

export function useFile() {
  const file = ref(null);
  const toast = useToast();

  async function upload(event) {
    const formData = new FormData();
    let input = event instanceof File ? event : event.files[0];
    formData.append('file', input);

    try {
      const res = await window.axios.post('upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      file.value = res.data;
      console.log(file.value);

      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'File Uploaded',
        life: 3000
      });
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Error Upload',
        detail: error,
        life: 3000
      });
    }
  }
  return { file: readonly(file), upload };
}
