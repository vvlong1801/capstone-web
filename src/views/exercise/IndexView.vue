<script setup>
import BaseView from '../BaseView.vue';
import ExerciseCard from './partials/ExerciseCard.vue';
import FilterBox from './partials/FilterBox.vue';
import { onMounted, ref, watch } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useExerciseStore } from '@/stores/exercise';
import { useAuthStore } from "@/stores/auth/auth";

const {userInfo, isAdmin} = useAuthStore();
const store = useExerciseStore();
const confirm = useConfirm();
const searchText = ref('');
const filterBoxVisible = ref(false);
const filteredExercise = ref([]);

watch(searchText, () => {
  filteredExercise.value = store.exercises?.filter((exe) => exe.name.includes(searchText.value));
});

onMounted(async () => {
  await store.getExercises();
  filteredExercise.value = store.exercises;
});

const confirmDelete = (id) => {
  confirm.require({
    message: 'Do you want to delete this exercise?',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: () => store.deleteExercise(id)
  });
};

const showFilterBox = () => {
  filterBoxVisible.value = !filterBoxVisible.value;
};

const onFilter = (data) => {
  filteredExercise.value = data;
};

const showActionExe = (createdById) =>{
  return userInfo.id == createdById || isAdmin ;
} 

</script>
<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <base-view title="Exercises">
    <filter-box
      :visible="filterBoxVisible"
      :data="store.exercises"
      @update:data="onFilter"
    ></filter-box>

    <div class="card flex flex-col space-y-6 min-h-full">
      <Toolbar>
        <template #start>
          <Button
            icon="pi pi-plus"
            class="p-button-rounded p-button-primary !border-none !mr-2"
            @click="$router.push({ name: 'exercise.create' })"
          />
          <Button
            :icon="`pi ${filterBoxVisible ? 'pi-filter-slash' : 'pi-filter'}`"
            class="p-button-rounded p-button-secondary !border-none"
            @click="showFilterBox"
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
          v-for="exe in filteredExercise"
          :exercise="exe"
          :key="exe.id"
          @click-delete="confirmDelete"
          :show-action="showActionExe(exe.created_by.id)"
        />
      </div>
    </div>
  </base-view>
</template>
