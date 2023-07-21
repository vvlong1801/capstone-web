<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
// import Rating from 'primevue/rating';
import { FilterMatchMode } from 'primevue/api';
import { ref } from 'vue';

defineProps(['datatable']);
const statuses = ref(['active', 'block']);
// const rateOptions = ref([5, 4, 3, 2, 1]);

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  phone_number: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  status: { value: null, matchMode: FilterMatchMode.EQUALS }
});

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

const onCreate = () => {};
</script>
<template>
  <div class="card space-y-6 min-h-full">
    <Toolbar>
      <template #start>
        <Button type="button" icon="pi pi-plus" class="!mr-2 p-button-rounded" @click="onCreate" />
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
      :value="datatable"
      tableStyle="min-width: 50rem"
      stripedRows
      scrollable
      filterDisplay="row"
      :globalFilterFields="['name', 'email', 'phone_number', 'status']"
    >
      <Column field="id" header="ID" style="min-width: 40px"></Column>
      <Column field="name" header="Name" sortable style="min-width: 200px" :showFilterMenu="false">
        <template #body="{ data }">
          <div class="flex items-center">
            <Avatar
              icon="pi pi-user"
              class="mr-2 !bg-primary-500"
              style="color: #ffffff"
              shape="circle"
              v-if="data.avatar == null"
            />

            <Avatar class="mr-2" :image="data.avatar.url" shape="circle" v-else />
            <span>{{ data.name }}</span>
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
      <!-- <Column
        field="rate"
        header="Rating"
        sortable
        style="min-width: 150px"
        :showFilterMenu="false"
      >
        <template #body="slotProps">
          <Rating v-model="slotProps.data.rate" readonly :cancel="false" />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="rateOptions"
            placeholder="Select One"
            class="p-column-filter"
            style="min-width: 8rem"
            :showClear="true"
          >
            <template #option="slotProps">
              <Rating v-model="slotProps.option" readonly :cancel="false" />
            </template>
          </Dropdown>
        </template>
      </Column> -->
      <Column field="email" header="Email" style="min-width: 100px" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter !w-48"
            placeholder="Search by email"
          /> </template
      ></Column>
      <Column field="members" header=" Members" sortable style="min-width: 100px"></Column>
      <Column field="challenges" header=" Challenges" sortable style="min-width: 100px"></Column>
      <Column field="exercises" header=" Exercises" sortable style="min-width: 100px"></Column>
      <Column
        field="status"
        header=" Status"
        sortable
        style="min-width: 100px"
        :showFilterMenu="false"
      >
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
            style="width: 6rem"
            :showClear="true"
          >
            <template #option="slotProps">
              <Tag :value="slotProps.option" :severity="getSeverityStatus(slotProps.option)" />
            </template>
          </Dropdown>
        </template>
      </Column>
      <Column>
        <template #body="{ data }">
          <div class="flex space-x-4">
            <Button
              label="Block"
              size="small"
              icon="pi pi-lock"
              iconPos="right"
              severity="danger"
              outlined
              v-if="data.status == 'active'"
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
</template>
