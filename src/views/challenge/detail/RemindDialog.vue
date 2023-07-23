<script setup>
import { ref } from "vue";
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';

const createRemind = (content) => {
  console.log('remind content', content)
  // TODO: call API here
  emit('closeDialog')
}

const content = ref(null);

defineProps(['isDialogVisible']);

const emit = defineEmits(['closeDialog'])

</script>

<template>
  <div class="card flex justify-content-center">
      <Dialog :visible="isDialogVisible" modal header="Remind user" :style="{ width: '50vw' }">
          <label for="content" class="mr-4">Content</label>
          <InputText id="content" v-model="content" />
          <template #footer>
              <Button label="Close" icon="pi pi-times" @click="$emit('closeDialog')" text />
              <Button label="Create" icon="pi pi-check" @click="() => createRemind(content)" autofocus />
          </template>
      </Dialog>
  </div>
</template>