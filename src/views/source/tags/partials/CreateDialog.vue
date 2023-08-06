<script setup>
import Dialog from 'primevue/dialog';
import { useTagStore } from '@/stores/tag';

defineProps(['visible']);
const emits = defineEmits(['update:visible']);

const store = useTagStore();

const typeOptions = [
  { label: 'challenge', value: 'ChallengeTag' },
  { label: 'group exercise', value: 'GroupExercise' },
  { label: 'creator technique', value: 'CreatorTechnique' }
];
const onSubmit = async () => {
  await store.createTag();
  emits('update:visible', false);
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
      <label for="name" class="col-span-2">
        <div>Name</div>
        <InputText class="w-full" type="text" label="name" id="name" v-model="store.form.name" />
      </label>

      <div class="col-span-2">
        <h5>Type</h5>
        <Dropdown
          v-model="store.form.type"
          inputId="tag_type"
          :options="typeOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Select a type"
          class="w-full md:w-14rem"
        />
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
