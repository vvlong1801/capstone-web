<script setup>
import ExerciseCard from '../../exercise/partials/ExerciseCard.vue';
import { defineProps, defineEmits, onMounted, ref, computed } from 'vue';
import { useExerciseStore } from '@/stores/exercise';
import Draggable from 'vuedraggable';

const props = defineProps(['visible', 'exercises']);

const emits = defineEmits(['update:visible', 'update:exercises']);
const store = useExerciseStore();
const dragging = ref(false);

const destinations = ref([]);
onMounted(async () => {
  await store.getExercises();
  destinations.value = props.exercises;
});

const sources = computed(() =>
  store.exercises.filter((item) => {
    let result = destinations.value.filter((des) => des.id === item.id);
    return result.length > 0 ? false : true;
  })
);

const onRemoveDestinations = (index) => destinations.value.splice(index, 1);
const onAddToDestinations = (index) => {
  sources.value[index].requirement = sources.value[index].requirement_initial;
  destinations.value.push(sources.value[index]);
};

const onSave = () => {
  emits('update:exercises', destinations.value);
  emits('update:visible', false);
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
        <div class="h-full overflow-y-scroll w-full">
          <div class="grid grid-cols-3 gap-6 pr-4">
            <exercise-card
              v-for="(exe, index) in sources"
              :exercise="exe"
              :key="exe.id"
              @click="onAddToDestinations(index)"
              :show-action="true"
            >
              <template #action>
                <Button class="!w-2 !h-2" icon="pi pi-plus" size="small" />
              </template>
            </exercise-card>
          </div>
        </div>
      </div>
      <Divider layout="vertical" />
      <div class="w-1/4 relative">
        <Draggable
          :list="destinations"
          group="exercise"
          item-key="id"
          @start="dragging = true"
          @end="dragging = false"
          class="space-y-4"
          handle=".handle"
        >
          <template #item="{ element, index }">
            <exercise-card :exercise="element" class="w-full" :expand="true" :show-action="true">
              <template #action>
                <div>
                  <i class="pi pi-times cursor-pointer" @click="onRemoveDestinations(index)"></i>
                </div>
              </template>
              <template #append>
                <div class="flex justify-center items-center">
                  <i class="pi pi-align-justify handle cursor-move" style="font-size: 0.75rem"></i>
                </div>
              </template>
              <template #expand>
                <div class="p-inputgroup flex-1">
                  <InputText placeholder="10" v-model="element.requirement" />
                  <span class="p-inputgroup-addon"> {{ element.requirement_unit.value }} </span>
                </div>
              </template>
            </exercise-card>
          </template>
        </Draggable>
        <div class="absolute bottom-0 left-0 w-full">
          <div class="flex justify-between items-center">
            <Button
              label="Cancel"
              class="p-button-secondary"
              size="small"
              @click="$emit('update:visible', false)"
            ></Button>
            <Button label="Save" icon="pi pi-check" size="small" @click="onSave"></Button>
          </div>
        </div>
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
