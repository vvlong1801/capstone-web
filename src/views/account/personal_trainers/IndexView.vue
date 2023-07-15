<script setup>
import BaseView from '@/views/BaseView.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import { FilterMatchMode } from 'primevue/api';

import { ref, onMounted } from 'vue';
// import { ProductService } from '@/service/ProductService';
const ptRequests = ref([
  {
    id: 1,
    name: 'long 1',
    email: 'long@gmail.com',
    gender: 'male',
    member: 10,
    challenge: 3,
    typeRequest: 'certificate',
    typeWork: 'freelancer',
    createdAt: '10/07/2023',
    updatedAt: '11/07/2023'
  },
  {
    id: 2,
    name: 'long 2',
    email: 'long@gmail.com',
    member: 10,
    challenge: 3,
    gender: 'female',
    typeRequest: 'num of member',
    typeWork: 'GYM',
    createdAt: '11/07/2023',
    updatedAt: '12/07/2023'
  }
]);

const getSeverityTypeRequest = (typeRequest) => {
  switch (typeRequest) {
    case 'certificate':
      return 'primary';
    case 'num of member':
      return 'warning';

    default:
      break;
  }
};
const getSeverityTypeWork = (typeWork) => {
  switch (typeWork) {
    case 'freelancer':
      return 'info';
    case 'GYM':
      return 'success';

    default:
      break;
  }
};

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  gender: { value: null, matchMode: FilterMatchMode.EQUALS },
  typeRequest: { value: null, matchMode: FilterMatchMode.EQUALS },
  typeWork: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const genderOptions = ref(['male', 'female']);
const typeRequestOptions = ref(['certificate', 'num of member']);
const typeWorkOptions = ref(['freelancer', 'GYM']);
</script>
<template>
  <base-view title="Personal Trainer Request">
    <div class="card space-y-6 min-h-full">
      <Toolbar>
        <template #end>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Search..." v-model="filters['global'].value" />
          </span>
        </template>
      </Toolbar>
      <DataTable
        v-model:filters="filters"
        :value="ptRequests"
        tableStyle="min-width: 50rem"
        stripedRows
        scrollable
        filterDisplay="row"
        sortField="createdAt"
        :sortOrder="-1"
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
        <Column field="email" header="Email" style="min-width: 200px"> </Column>
        <Column field="member" header="Members" style="min-width: 150px"></Column>
        <Column field="challenge" header="Challenges" style="min-width: 150px"></Column>
        <Column
          field="typeRequest"
          header="Type Request"
          style="min-width: 150px"
          :showFilterMenu="false"
        >
          <template #body="{ data }">
            <div class="flex space-x-4">
              <Tag
                :value="data.typeRequest"
                class="!text-sm"
                :severity="getSeverityTypeRequest(data.typeRequest)"
              />
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="typeRequestOptions"
              placeholder="Select One"
              class="p-column-filter"
              style="min-width: 8rem"
              :showClear="true"
            >
            </Dropdown>
          </template>
        </Column>
        <Column
          field="typeWork"
          header="Type Work"
          style="min-width: 150px"
          :showFilterMenu="false"
        >
          <template #body="{ data }">
            <div class="flex space-x-4">
              <Tag
                :value="data.typeWork"
                class="!text-sm"
                :severity="getSeverityTypeWork(data.typeWork)"
              />
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="typeWorkOptions"
              placeholder="Select One"
              class="p-column-filter"
              style="min-width: 8rem"
              :showClear="true"
            >
            </Dropdown>
          </template>
        </Column>
        <Column field="createdAt" header=" Created At" style="min-width: 150px" sortable> </Column>
        <Column>
          <template #body="{ index }">
            <div class="flex space-x-4">
              <Button
                label="Detail"
                size="small"
                icon="pi pi-angle-right"
                iconPos="right"
                outlined
                @click="$router.push({ name: 'personal_trainers.show', params: { id: index } })"
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
