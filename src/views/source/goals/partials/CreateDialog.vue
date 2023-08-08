<script setup>
import Dialog from 'primevue/dialog';
import TagTable from './TagTable.vue';
import { useGoalStore } from '@/stores/goal';

defineProps(['visible']);
const emits = defineEmits(['update:visible']);
const store = useGoalStore();

const onSubmit = async () => {
  await store.createGoal();
  emits("update:visible", false);
};

const onSelectTag = (data) => {
  store.form.tags = data;
}
</script>
<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible')"
    modal
    header="Create"
    :style="{ width: '70vw' }"
  >
    <div class="grid grid-cols-4 gap-6 py-6">
      <label for="name" class="col-span-4">
        <div>Name</div>
        <InputText class="w-full" type="text" label="name" id="name" v-model="store.form.name" />
      </label>
      <tag-table class="col-span-4" @select-tag="onSelectTag"></tag-table>
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
