<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue';
import { useMuscleStore } from '@/stores/muscle';
import { useEquipmentStore } from '@/stores/equipment';
import { useExerciseStore } from '@/stores/exercise';

const store = useExerciseStore();
const equipmentStore = useEquipmentStore();
const muscleStore = useMuscleStore();
const props = defineProps(['visible', 'data']);
const emits = defineEmits(['update:data']);

onMounted(async () => {
  equipmentStore.getEquipments();
  muscleStore.getMuscles();
  store.getGroupTags();
});

const gender = ref('all');
const level = ref([]);
const selectedUnit = ref([]);
const selectedMuscle = ref([]);
const selectedEquipment = ref([]);
const selectedTag = ref([]);
const filtered = computed(() => props.data);

const genderOption = ['male', 'female', 'all'];
const levelOption = ['easy', 'middle', 'hard'];
const unitOption = ['reps', 'seconds'];

watchEffect(() => {
  var filteredExe;
  if (props.visible) {
    filteredExe = filtered?.value?.filter((exe) => {
      let result =
        ((exe.for_gender == gender.value) || gender.value == "all") &&
        (level.value.includes(exe.level?.value) || level.value.length == 0) &&
        (selectedUnit.value.includes(exe.requirement_unit?.value) ||
          selectedUnit.value.length == 0) &&
        (selectedEquipment.value.includes(exe.equipment?.id) ||
          selectedEquipment.value.length == 0) &&
        (selectedMuscle.value.some((muscleId) => exe.muscles.map((m) => m.id).includes(muscleId)) ||
          selectedMuscle.value.length == 0) &&
        (selectedTag.value.some((tagId) => exe.group_tags.map((m) => m.id).includes(tagId)) ||
          selectedTag.value.length == 0);
      return result;
    });
  } else {
    filteredExe = props.data;
  }

  emits('update:data', filteredExe);
});
</script>
<template>
  <div class="card mb-6" v-if="visible">
    <div class="bg-gray-50 border border-slate-200 rounded-md p-6 space-y-6">
      <div class="flex gap-4">
        <div class="p-float-label flex-1">
          <Dropdown
            v-model="gender"
            :options="genderOption"
            placeholder="Select a gender"
            class="w-full"
            id="gender"
          />
          <label for="gender">Gender</label>
        </div>
        <div class="p-float-label flex-1">
          <MultiSelect
            v-model="level"
            :options="levelOption"
            display="chip"
            placeholder="Select level"
            :maxSelectedLabels="3"
            class="w-full md:w-20rem"
          />
          <label for="level">Level</label>
        </div>
        <div class="p-float-label flex-1">
          <MultiSelect
            v-model="selectedUnit"
            :options="unitOption"
            display="chip"
            placeholder="Select unit"
            :maxSelectedLabels="3"
            class="w-full md:w-20rem"
          />
          <label for="type">Requirement Unit</label>
        </div>
      </div>
      <div class="flex gap-4">
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
            optionLabel="name"
            optionValue="id"
            display="chip"
            placeholder="Select equipment"
            :maxSelectedLabels="3"
            class="w-full"
          >
            <template #option="{ option }">
              <div class="flex justify-between w-full items-center">
                <p class="capitalize">{{ option.name }}</p>
                <img :alt="option.name" :src="option.image.url" class="mr-2 w-8" />
              </div>
            </template>
          </MultiSelect>
          <label for="equipment">Equipments</label>
        </div>
      </div>
      <div class="flex gap-4">
        <div class="p-float-label flex-1">
          <MultiSelect
            v-model="selectedTag"
            :options="store.groupTags"
            optionLabel="name"
            optionValue="id"
            display="chip"
            placeholder="Select tag"
            :maxSelectedLabels="3"
            class="w-full md:w-20rem"
          />
          <label for="tags">Tags</label>
        </div>
      </div>
    </div>
  </div>
</template>
