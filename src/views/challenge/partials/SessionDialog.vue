<script setup>
import ExerciseCard from '../../exercise/partials/ExerciseCard.vue';
import { defineProps, defineEmits, onMounted, ref, computed } from 'vue';
import { useExerciseStore } from '@/stores/exercise';
import { useMuscleStore } from '@/stores/muscle';
import { useEquipmentStore } from '@/stores/equipment';

import Draggable from 'vuedraggable';
import { GENDER } from '@/utils/option';

const props = defineProps(['visible', 'exercises']);

const equipmentStore = useEquipmentStore();
const muscleStore = useMuscleStore();
const emits = defineEmits(['update:visible', 'update:exercises']);
const store = useExerciseStore();
const dragging = ref(false);
const levelFilter = ref('');
const genderFilter = ref('all');
const destinations = ref([]);
const selectedMuscle = ref([]);
const selectedEquipment = ref([]);
const selectedUnit = ref(['seconds', 'reps']);

onMounted(async () => {
  destinations.value = props.exercises;
  equipmentStore.getEquipments();
  muscleStore.getMuscles();
});

const sources = computed(() =>
  store.exercises.filter((item) => {
    let result = destinations.value.filter((des) => des.id === item.id);
    let inDestinations = result.length > 0;
    let inLevel = levelFilter.value == '' || item.level.value == levelFilter.value;
    let inGender = genderFilter.value == 'all' || item.for_gender == genderFilter.value;
    let inUnit = selectedUnit.value.includes(item.requirement_unit.value);
    let inMuscle =
      selectedMuscle.value.some((muscleId) => item.muscles.map((m) => m.id).includes(muscleId)) ||
      selectedMuscle.value.length == 0;
    let inEquipment =
      selectedEquipment.value.includes(item.equipment?.id) || selectedEquipment.value.length == 0;
    return !inDestinations && inLevel && inGender && inMuscle && inEquipment && inUnit;
  })
);

const onRemoveDestinations = (index) => destinations.value.splice(index, 1);
const onAddToDestinations = (index) => {
  sources.value[index].requirement = sources.value[index].requirement_initial;
  destinations.value = [...destinations.value, sources.value[index]];
};

const onSave = () => {
  emits('update:exercises', destinations.value);
  emits('update:visible', false);
};

const levelOptions = [
  {
    label: 'All',
    value: ''
  },
  {
    label: 'Easy',
    value: 'easy'
  },
  {
    label: 'Middle',
    value: 'middle'
  },
  {
    label: 'Hard',
    value: 'hard'
  }
];

const unitOption = ['reps', 'seconds'];
</script>
<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible')"
    modal
    header="Edit Session"
    :style="{ width: '96vw', height: '90vh' }"
    class="!overflow-hidden"
  >
    <div class="flex relative">
      <div class="w-3/4 space-y-6 h-[78vh] overflow-hidden">
        <div class="sticky top-0 left-0 z-10">
          <div class="bg-gray-50 border border-slate-200 rounded-md p-6 space-y-6">
            <div class="flex gap-4">
              <div class="p-input-icon-left w-1/5">
                <i class="pi pi-search" />
                <InputText placeholder="Search..." class="w-full"/>
              </div>
              <div class="p-float-label flex-1">
                <MultiSelect
                  v-model="selectedMuscle"
                  :options="muscleStore.muscles"
                  optionValue="id"
                  optionLabel="name"
                  display="chip"
                  placeholder="Select muscles"
                  :maxSelectedLabels="3"
                  class="w-full md:w-20rem"
                >
                  <template #option="{ option }">
                    <div class="flex justify-between w-full items-center">
                      <p class="capitalize">{{ option.name }}</p>
                      <img :alt="option.name" :src="option.image.url" class="mr-2 w-8" />
                    </div>
                  </template>
                </MultiSelect>
                <label for="muscles">Muscles</label>
              </div>
              <div class="p-float-label flex-1">
                <MultiSelect
                  v-model="selectedEquipment"
                  :options="equipmentStore.equipments"
                  optionValue="id"
                  optionLabel="name"
                  display="chip"
                  placeholder="Select equipment"
                  :maxSelectedLabels="3"
                  class="w-full md:w-20rem"
                >
                  <template #option="{ option }">
                    <div class="flex justify-between w-full items-center">
                      <p class="capitalize">{{ option.name }}</p>
                      <img :alt="option.name" :src="option.image.url" class="mr-2 w-8" />
                    </div>
                  </template>
                </MultiSelect>
                <label for="equipment">Equipment</label>
              </div>

              <div class="p-float-label flex-1">
                <Dropdown
                  v-model="levelFilter"
                  :options="levelOptions"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select level"
                  class="w-full md:w-14rem"
                />
                <label for="level">Level</label>
              </div>
              <div class="p-float-label flex-2">
                <Dropdown
                  v-model="genderFilter"
                  :options="GENDER"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select gender"
                  class="w-full"
                />
                <label for="gender">Gender</label>
              </div>
              <div class="p-float-label flex-2">
                <MultiSelect
                  v-model="selectedUnit"
                  :options="unitOption"
                  placeholder="Select unit"
                  class="!w-full"
                />
                <label for="unit">Unit</label>
              </div>
            </div>
          </div>
        </div>
        <div class="h-full overflow-y-scroll w-full">
          <div class="grid grid-cols-3 gap-6 m r-4">
            <exercise-card
              class="cursor-pointer"
              v-for="(exe, index) in sources"
              :exercise="exe"
              :key="exe.id"
              @click="onAddToDestinations(index)"
              :show-action="false"
            >
              <!-- <template #action>
                <Button class="!w-2 !h-2" icon="pi pi-plus" size="small" />
              </template> -->
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
