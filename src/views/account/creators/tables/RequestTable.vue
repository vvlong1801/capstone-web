<script setup>
import BaseView from '@/views/BaseView.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import { FilterMatchMode } from 'primevue/api';
import { ref } from 'vue';

defineProps(['datatable']);

const getSeverityTypeWork = (typeWork) => {
  switch (typeWork) {
    case 'freelancer':
      return 'info';
    case 'GYM':
      return 'success';

    default:
      return 'primary';
  }
};

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  gender: { value: null, matchMode: FilterMatchMode.EQUALS },
  work_type: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const genderOptions = ref(['male', 'female']);
const typeWorkOptions = ref(['freelancer', 'GYM']);
</script>
<template>
  <base-view title=" List Personal Trainer Request">
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
        :value="datatable"
        tableStyle="min-width: 50rem"
        stripedRows
        scrollable
        filterDisplay="row"
        sortField="createdAt"
        :sortOrder="-1"
        :globalFilterFields="['name', 'gender', 'level', 'work_type', 'gender']"
      >
        <Column field="id" header="ID" style="min-width: 40px"></Column>
        <Column
          field="name"
          header="Name"
          sortable
          style="min-width: 200px"
          :showFilterMenu="false"
        >
          <template #body="{ data }">
            <div class="flex items-center">
              <Avatar
                icon="pi pi-user"
                class="mr-2 !bg-primary-500"
                style="color: #ffffff"
                shape="circle"
                v-if="data.user?.avatar == null"
              />

              <Avatar class="mr-2" :image="data.user.avatar.url" shape="circle" v-else />
              <span>{{ data.user.name }}</span>
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
        <Column field="age" header="Age" style="min-width: 200px" sortable> </Column>
        <Column field="members" header="Members" style="min-width: 150px" sortable></Column>
        <Column field="challenges" header="Challenges" style="min-width: 150px" sortable></Column>
        <Column
          field="work_type"
          header="Work Type"
          style="min-width: 150px"
          :showFilterMenu="false"
        >
          <template #body="{ data }">
            <div class="flex space-x-4">
              <Tag
                :value="data.work_type"
                class="!text-sm"
                :severity="getSeverityTypeWork(data.work_type)"
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
        <Column field="updated_at" header="Updated At" style="min-width: 150px" sortable> </Column>
        <Column>
          <template #body="{ data }">
            <div class="flex space-x-4">
              <Button
                label="Detail"
                size="small"
                icon="pi pi-angle-right"
                iconPos="right"
                outlined
                @click="$router.push({ name: 'creators.request-pt.show', params: { id: data.id } })"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </base-view>
</template>
