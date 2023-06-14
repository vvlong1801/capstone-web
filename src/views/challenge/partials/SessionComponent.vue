<script setup>
import SessionDialog from './SessionDialog.vue';
import ExerciseCard from '../../exercise/partials/ExerciseCard.vue';
import OverlayPanel from 'primevue/overlaypanel';
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { useExerciseStore } from '@/stores/exercise';

const props = defineProps(['sessionName', 'exercises', 'descriptions']);
const emits = defineEmits(['update:exercises', 'update:descriptions']);

const exerciseStore = useExerciseStore();

const selectedExercises = ref([]);

const openDialog = ref(false);
const exerciseSelectBox = ref();
const searchText = ref('');

onMounted(exerciseStore.getExercises);

const toggleExerciseSelectBox = (event) => {
  exerciseSelectBox.value.toggle(event);
};

const pushSessionExercise = (id, requirement) => {
  selectedExercises.value.push({ exercise_id: id, requirement: requirement });
};
</script>
<template>
  <div class="flex-col space-y-2 w-[276px]">
    <session-dialog
      v-model:visible="openDialog"
      :exercises="exercises"
      @update:exercises="($event) => $emit('update:exercises', $event)"
    ></session-dialog>
    <div
      class="border rounded-t-md p-2 text-center font-semibold text-white bg-indigo-500 relative"
    >
      {{ `Day ${sessionName}` }}
      <Button
        icon="pi pi-cog"
        text
        size="small"
        rounded
        aria-label="edit"
        class="!absolute !top-1/2 !right-2 !w-8 !h-8 -translate-y-1/2 !text-white"
        @click="openDialog = true"
      />
    </div>
    <template v-if="exercises?.length > 0">
      <div
        class="border flex p-2 items-center justify-between"
        v-for="exe in exercises"
        :key="exe.id"
      >
        <div class="flex space-x-2">
          <img :src="exe.image?.url" alt="" class="w-12 h-12 object-cover" />
          <div>
            <h5 class="font-medium p-text-primary">{{ exe.name }}</h5>
            <span class="text-indigo-600 font-semibold mr-2">{{
              `${exe.requirement} ${exe.requirement_unit.value ?? exe.requirement_unit}`
            }}</span>
          </div>
        </div>
        <i class="pi pi-arrow-right-arrow-left cursor-pointer"></i>
      </div>
    </template>
    <div
      class="w-full h-16 flex items-center justify-center bg-gray-400 hover:opacity-80 cursor-pointer"
      @click="toggleExerciseSelectBox"
    >
      <i class="pi pi-plus font-bold text-lg text-white"></i>
    </div>
    <OverlayPanel ref="exerciseSelectBox">
      <div class="w-fit p-4 flex-col space-y-4">
        <span class="p-input-icon-left w-full">
          <InputText v-model="searchText" placeholder="Search" class="!w-full" />
          <i class="pi pi-search" />
        </span>
        <ExerciseCard
          v-for="exe in exerciseStore.exercises"
          :exercise="exe"
          :key="exe.id"
          :show-action="false"
          @click="pushSessionExercise(exe.id)"
        >
        </ExerciseCard>
      </div>
    </OverlayPanel>
  </div>
</template>
