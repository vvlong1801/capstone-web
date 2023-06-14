<script setup>
import ExerciseCard from '../../exercise/partials/ExerciseCard.vue';
import { defineProps, onMounted, ref } from 'vue';
import { useExerciseStore } from '@/stores/exercise';
import Draggable from 'vuedraggable';
import SessionExerciseCard from './SessionExerciseCard.vue';

defineProps(['visible']);

const store = useExerciseStore();
const dragging = ref(false);
const selectedList = ref([]);

onMounted(async () => {
  await store.getExercises();
  selectedList.value = store.exercises;
});

const sources = ref([
  {
    id: 3,
    name: 'test exer 4 update',
    level: 'easy',
    type: 1,
    created_by: 'admin',
    group_tags: [
      {
        id: 1,
        name: 'build muscle'
      }
    ],
    evaluate_method: 'repitition',
    description: 'test',
    image: {
      filename: 'exe-banner.jpg',
      path: 'exercises/64881f6b90ce2-exe-banner.jpg',
      url: 'http://localhost:8000/storage/exercises/64881f6b90ce2-exe-banner.jpg'
    }
  },
  {
    id: 5,
    name: 'test',
    level: 'easy',
    type: 1,
    created_by: 'admin',
    group_tags: [
      {
        id: 1,
        name: 'build muscle'
      }
    ],
    evaluate_method: 'repitition',
    description: 'adsad',
    image: {
      filename: 'exe-banner.jpg',
      path: 'exercises/648817001bfac-exe-banner.jpg',
      url: 'http://localhost:8000/storage/exercises/648817001bfac-exe-banner.jpg'
    }
  }
]);
const destinations = ref([]);
const onAddToDestinations = (index) => {
  destinations.value.push(sources.value[index]);
  sources.value.splice(index, 1);
};
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
              <Button icon="pi pi-plus" class="mr-2" rounded />
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
          <exercise-card
            v-for="(exe, index) in sources"
            :exercise="exe"
            :key="exe.id"
            @click="onAddToDestinations(index)"
          >
            <template #action>
              <Button class="!w-2 !h-2" icon="pi pi-plus" size="small" />
            </template>
          </exercise-card>
        </div>
      </div>
      <Divider layout="vertical" />
      <div class="w-1/4">
        <Draggable
          :list="destinations"
          group="exercise"
          item-key="id"
          @start="dragging = true"
          @end="dragging = false"
          class="space-y-4"
          handle=".handle"
        >
          <template #item="{ element }">
            <session-exercise-card
              :exercise="element"
              @click="
                () => {
                  console.log('aaaa');
                }
              "
            />
          </template>
        </Draggable>
        <!-- <session-exercise-card v-for="exe in destinations" :key="exe.id" :exercise="exe" /> -->
      </div>
    </div>
  </Dialog>
</template>
<style>
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
