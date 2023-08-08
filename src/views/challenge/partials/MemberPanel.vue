<script setup>
import { FilterMatchMode } from 'primevue/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import { ref } from 'vue';

defineProps(['members']);
const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  gender: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const genderOptions = ref(['male', 'female']);
</script>
<template>
  <DataTable
    v-model:filters="filters"
    :value="members"
    stripedRows
    tableStyle="max-width: 100%"
    scrollable
    paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
    filterDisplay="row"
    :globalFilterFields="['name', 'gender', 'email']"
  >
    <template #empty> No members. </template>
    <template #loading> Loading members data. Please wait. </template>
    <Column field="name" header="Name" style="min-width: 100px" :showFilterMenu="false">
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
    <Column field="email" header="Email" :show-filter-menu="false">
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          class="p-column-filter !w-48"
          placeholder="Search by email"
        />
      </template>
    </Column>
    <Column field="age" header="Age" sortable> </Column>
    <Column field="gender" header="Gender" style="min-width: 100px" :showFilterMenu="false">
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
    <Column field="join_at" header="Join at" sortable> </Column>
    <Column>
      <template #body="{ index, data }">
        <div class="flex space-x-4">
          <Button
            label="Detail"
            size="small"
            icon="pi pi-angle-right"
            iconPos="right"
            outlined
            @click="$router.push({ name: 'member.show', params: { id: data.challenge_member_id } })"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
