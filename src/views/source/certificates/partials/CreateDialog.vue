<script setup>
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import Textarea from 'primevue/textarea';

import { useFile } from '@/composables/file.js';
import { useCertificateStore } from '@/stores/certificate';

defineProps(['visible']);
const emits = defineEmits(['update:visible']);

const fileService = useFile();
const store = useCertificateStore();

const onUpload = async (event) => {
  await fileService.upload(event);
  store.form.example = fileService.file.value;
};

const onSubmit = async () => {
  await store.createCertificate();
  emits("update:visible", false);
};
</script>
<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible')"
    modal
    header="Create"
    :style="{ width: '50vw' }"
  >
    <div class="grid grid-cols-4 gap-6 py-6">
      <label for="name" class="col-span-3">
        <div>Name</div>
        <InputText class="w-full" type="text" label="name" id="name" v-model="store.form.name" />
      </label>

      <div class="col-span-1">
        <h5>Example Certificate</h5>
        <FileUpload
          name="example"
          mode="basic"
          :customUpload="true"
          :auto="true"
          @uploader="onUpload"
          :upload-icon="store.form.example ? '' : 'pi pi-fw pi-upload'"
          :choose-label="store.form.example?.filename"
          class="w-full"
        >
        </FileUpload>
      </div>
      <div class="col-span-4">
        <label for="description">
          <span>Description</span>
          <Textarea
            v-model="store.form.description"
            class="textarea-restyle"
            rows="5"
            id="description"
          />
        </label>
      </div>
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="$emit('update:visible', false)"
        class="p-button-text"
      />
      <Button label="Save" icon="pi pi-check" @click="onSubmit" />
    </template>
  </Dialog>
</template>
