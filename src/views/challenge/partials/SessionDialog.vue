<script setup>
import ExerciseCard from '../../exercise/partials/ExerciseCard.vue';
import { defineProps, onMounted } from 'vue';
import { useExerciseStore } from '@/stores/exercise';

defineProps(['visible']);

const store = useExerciseStore();

onMounted(() => {
  store.getExercises();
});
</script>
<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible')"
    modal
    header="Edit Session"
    :style="{ width: '90vw' }"
    class="!overflow-hidden"
  >
    <div class="flex relative">
      <div class="w-3/4 space-y-6 h-[70vh] overflow-hidden">
        <div class="sticky top-0 left-0 z-10">
          <Toolbar>
            <template #start>
              <Button label="New" icon="pi pi-plus" class="mr-2" />
            </template>

            <template #end>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText placeholder="Search..." />
              </span>
            </template>
          </Toolbar>
        </div>
        <div class="h-full overflow-y-scroll w-full grid grid-cols-3 gap-6 pr-4">
          <exercise-card v-for="exe in store.exercises" :exercise="exe" :key="exe.id" />
          <exercise-card v-for="exe in store.exercises" :exercise="exe" :key="exe.id" />
          <exercise-card v-for="exe in store.exercises" :exercise="exe" :key="exe.id" />
          <exercise-card v-for="exe in store.exercises" :exercise="exe" :key="exe.id" />
          <exercise-card v-for="exe in store.exercises" :exercise="exe" :key="exe.id" />
          <exercise-card v-for="exe in store.exercises" :exercise="exe" :key="exe.id" />
          <exercise-card v-for="exe in store.exercises" :exercise="exe" :key="exe.id" />
          <exercise-card v-for="exe in store.exercises" :exercise="exe" :key="exe.id" />
          <exercise-card v-for="exe in store.exercises" :exercise="exe" :key="exe.id" />
          <exercise-card v-for="exe in store.exercises" :exercise="exe" :key="exe.id" />
        </div>
      </div>
      <Divider layout="vertical" />
      <div class="bg-orange-200 w-1/4">asfafs</div>
    </div>
  </Dialog>
</template>
