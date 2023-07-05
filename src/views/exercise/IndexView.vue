<script setup>
import BaseView from '../BaseView.vue';
import ExerciseCard from './partials/ExerciseCard.vue';

import { onMounted, ref, computed } from 'vue';
import { useExerciseStore } from '@/stores/exercise';
import { useConfirm } from 'primevue/useconfirm';

const store = useExerciseStore();
const confirm = useConfirm();
const searchText = ref('');

const exercises = computed(() => {
  return store.exercises?.filter((exe) => exe.name.includes(searchText.value));
});

onMounted(() => {
  store.getExercises();
});

const confirmDelete = (id) => {
  confirm.require({
    message: 'Do you want to delete this exercise?',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: () => store.deleteExercise(id)
  });
};

const showFilter = () => {
  console.log('filter');
};
</script>
<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <base-view title="Exercises">
    <div class="card flex flex-col space-y-6 min-h-full">
      <Toolbar>
        <template #start>
          <Button
            icon="pi pi-plus"
            class="p-button-rounded p-button-primary !border-none !mr-2"
            @click="$router.push({ name: 'exercise.create' })"
          />
          <Button
            icon="pi pi-filter"
            class="p-button-rounded p-button-secondary !border-none"
            @click="showFilter"
          />
        </template>
        <template #end>
          <div class="w-full">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="searchText" placeholder="Search" />
            </span>
          </div>
        </template>
      </Toolbar>
      <div class="grid grid-cols-3 gap-6">
        <exercise-card
          v-for="exe in exercises"
          :exercise="exe"
          :key="exe.id"
          @click-delete="confirmDelete"
          :show-action="true"
        />
      </div>
    </div>
  </base-view>
</template>
