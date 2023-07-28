<script setup>
import BaseView from '@/views/BaseView.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import { FilterMatchMode } from 'primevue/api';

import { ref } from 'vue';
const creators = ref([
  {
    id: 1,
    name: 'long 1',
    email: 'long@gmail.com',
    gender: 'male',
    age: 18,
    level: 'beginner',
    challenge: 'challenge A',
    last_workout_day: '12/07/2023',
    total_workout_day: 4,
    current_session: 3,
    status: 'active'
  },
  {
    id: 2,
    name: 'long 2',
    email: 'long2@gmail.com',
    gender: 'female',
    age: 20,
    level: 'beginner',
    challenge: 'challenge A',
    last_workout_day: '12/07/2023',
    total_workout_day: 4,
    current_session: 3,
    status: 'active'
  }
]);

const getSeverityStatus = (status) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'block':
      return 'danger';

    default:
      break;
  }
};

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
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  challenge: { value: null, matchMode: FilterMatchMode.CONTAINS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  level: { value: null, matchMode: FilterMatchMode.EQUALS },
  gender: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const genderOptions = ref(['male', 'female']);
const statuses = ref(['active', 'block']);
const levelOptions = ref(['beginner', 'intermediate', 'advanced']);
</script>
<template>
  <base-view title="List Members">
    <div class="card space-y-6 min-h-full">
      <Toolbar>
        <template #start> </template>
        <template #end>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Search..." />
          </span>
        </template>
      </Toolbar>
      <DataTable
        v-model:filters="filters"
        :value="creators"
        tableStyle="min-width: 50rem"
        stripedRows
        scrollable
        filterDisplay="row"
        :globalFilterFields="['name', 'gender', 'level', 'status']"
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

        <Column field="email" header="Email" style="min-width: 150px" :showFilterMenu="false">
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
        <Column
          field="challenge"
          header=" Challenge"
          style="min-width: 150px"
          :showFilterMenu="false"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter !w-48"
              placeholder="Search by challenge name"
            />
          </template>
        </Column>
        <Column field="status" header=" Status" style="min-width: 150px" :showFilterMenu="false">
          <template #body="{ data }">
            <div class="flex space-x-4">
              <Tag :severity="getSeverityStatus(data.status)" :value="data.status" rounded />
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="statuses"
              placeholder="Select One"
              class="p-column-filter"
              style="min-width: 6rem"
              :showClear="true"
            >
              <template #option="slotProps">
                <Tag :value="slotProps.option" :severity="getSeverityStatus(slotProps.option)" />
              </template>
            </Dropdown>
          </template>
        </Column>
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
      </DataTable>
    </div>
  </base-view>
</template>
