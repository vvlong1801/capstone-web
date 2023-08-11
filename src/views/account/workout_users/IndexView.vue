<script setup>
import BaseView from '@/views/BaseView.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import { FilterMatchMode } from 'primevue/api';

import { ref, onMounted } from 'vue';
import { useWorkoutUserStore } from '@/stores/workoutUser';

const store = useWorkoutUserStore();

onMounted(async () => await store.getWorkoutUsers());

const getSeverityLevel = (level) => {
  switch (level) {
    case 'beginner':
      return 'primary';
    case 'intermediate':
      return 'info';
    case 'advanced':
      return 'warning';
    default:
      break;
  }
};

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  gender: { value: null, matchMode: FilterMatchMode.EQUALS },
  level: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const genderOptions = ref(['male', 'female']);
const levelOptions = ref(['beginner', 'intermediate', 'advanced']);
const onCreate = () => {};
</script>
<template>
  <base-view title="List Workout Users">
    <div class="card space-y-6 min-h-full">
      <Toolbar>
        <template #start>
          <Button
            type="button"
            icon="pi pi-plus"
            class="!mr-2 p-button-rounded"
            @click="onCreate"
          />
        </template>
        <template #end>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Search..." />
          </span>
        </template>
      </Toolbar>
      <DataTable
        v-model:filters="filters"
        :value="store.workoutUsers"
        tableStyle="min-width: 50rem"
        stripedRows
        paginator
        :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
        scrollable
        filterDisplay="row"
        :globalFilterFields="['name', 'gender', 'level']"
      >
        <Column field="id" header="ID" style="min-width: 40px"></Column>
        <Column
          field="name"
          header="Name"
          sortable
          style="min-width: 200px"
          :showFilterMenu="false"
        >
          <template #body="slotProps">
            <div class="flex items-center">
              <Avatar
                icon="pi pi-user"
                class="mr-2"
                style="background-color: #2196f3; color: #ffffff"
                shape="circle"
              />
              <span>{{ slotProps.data.name }}</span>
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter !w-48"
              placeholder="Search by name"
            />
          </template>
        </Column>
        <Column field="gender" header="Gender" style="min-width: 200px" :showFilterMenu="false">
          <template #body="{ data }">
            <div class="flex space-x-4">
              <Chip :label="data.gender" class="!text-sm" />
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="genderOptions"
              placeholder="Select One"
              class="p-column-filter"
              style="min-width: 8rem"
              :showClear="true"
            >
            </Dropdown>
          </template>
        </Column>
        <Column field="level" header="Level" style="min-width: 200px" :showFilterMenu="false">
          <template #body="{ data }">
            <div class="flex space-x-4">
              <Tag :severity="getSeverityLevel(data.level)" :value="data.level" rounded />
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="levelOptions"
              placeholder="Select One"
              class="p-column-filter"
              style="min-width: 8rem"
              :showClear="true"
            >
              <template #option="slotProps">
                <Tag :value="slotProps.option" :severity="getSeverityLevel(slotProps.option)" />
              </template>
            </Dropdown>
          </template>
        </Column>
        <Column field="email" header="Email" sortable style="min-width: 150px"></Column>
        <Column field="age" header="Age" sortable style="min-width: 150px"></Column>
        <Column field="height" header="Height" sortable style="min-width: 150px"></Column>
        <Column field="weight" header="Weight" sortable style="min-width: 150px"></Column>
        <Column field="bmi" header="BMI" sortable style="min-width: 150px"></Column>
        <Column>
          <template #body="{ index }">
            <div class="flex space-x-4">
              <Button
                label="Detail"
                size="small"
                icon="pi pi-angle-right"
                iconPos="right"
                outlined
                @click="$router.push({ name: 'member.show', params: { id: index } })"
              />
            </div>
          </template>
        </Column>
        <!-- <Column>
          <template #body="{ index }">
            <div class="flex space-x-4">
              <Button icon="pi pi-lock" severity="danger" rounded size="small" outlined />
            </div>
          </template>
        </Column> -->
      </DataTable>
    </div>
  </base-view>
</template>
