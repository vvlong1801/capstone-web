import { ref } from "vue";
import { useToast } from "primevue/usetoast";

export function useFile() {
  const file = ref(null);
  const toast = useToast();

  const upload = async (event) => {
    const formData = new FormData();
    formData.append("file", event.files[0]);

    try {
      const res = await window.axios.post("upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      file.value =  res.data;

      toast.add({
        severity: "success",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Error Upload",
        detail: error,
        life: 3000,
      });
    }
  };
  return { file, upload };
}