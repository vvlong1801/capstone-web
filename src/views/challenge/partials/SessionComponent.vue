<script setup>
import SessionDialog from './SessionDialog.vue';
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { useExerciseStore } from '@/stores/exercise';

const props = defineProps(['sessionName', 'exercises', 'descriptions', 'edit']);
defineEmits(['update:exercises', 'update:descriptions']);

const exerciseStore = useExerciseStore();

const openDialog = ref(false);
console.log('session component', props.exercises);

onMounted(exerciseStore.getExercises);
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
      </div>
    </template>
    <div
      class="w-full h-16 flex items-center justify-center bg-gray-400 hover:opacity-80 cursor-pointer"
      @click="openDialog = true"
      v-if="edit"
    >
      <i class="pi pi-plus font-bold text-lg text-white"></i>
    </div>
  </div>
</template>
