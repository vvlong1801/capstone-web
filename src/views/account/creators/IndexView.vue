<script setup>
import BaseView from '@/views/BaseView.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import Rating from 'primevue/rating';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import { FilterMatchMode } from 'primevue/api';

import { ref, onMounted } from 'vue';
// import { ProductService } from '@/service/ProductService';

const creators = ref([
  {
    id: 1,
    name: 'creator 1',
    email: 'creator1@gmail.com',
    phoneNumber: '0987654321',
    isPT: true,
    challenges: 3,
    members: 200,
    exercises: 30,
    rating: 4,
    status: 'active'
  },
  {
    id: 2,
    name: 'creator 2',
    email: 'creator2@gmail.com',
    phoneNumber: '0987654321',
    isPT: false,
    challenges: 3,
    members: 200,
    exercises: 30,
    rating: 4,
    status: 'active'
  },
  {
    id: 3,
    name: 'creator 3',
    email: 'creator3@gmail.com',
    phoneNumber: '0987654321',
    isPT: false,
    challenges: 3,
    members: 200,
    exercises: 30,
    rating: 4,
    status: 'active'
  },
  {
    id: 4,
    name: 'creator 4',
    email: 'creator4@gmail.com',
    phoneNumber: '0987654321',
    isPT: false,
    challenges: 3,
    members: 200,
    exercises: 30,
    rating: 4,
    status: 'active'
  },
  {
    id: 5,
    name: 'creator 5',
    email: 'creator5@gmail.com',
    phoneNumber: '0987654321',
    isPT: false,
    challenges: 3,
    members: 200,
    exercises: 30,
    rating: 4,
    status: 'block'
  }
]);

const statuses = ref(['active', 'block']);
const rateOptions = ref([5, 4, 3, 2, 1]);

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  isPT: { value: null, matchMode: FilterMatchMode.EQUALS },
  rating: { value: null, matchMode: FilterMatchMode.EQUALS }
});
// onMounted(() => {
//   ProductService.getProductsMini().then((data) => (products.value = data));
// });

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
</script>
<template>
  <base-view title="List Creators">
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
        :value="creators"
        tableStyle="min-width: 50rem"
        stripedRows
        scrollable
        filterDisplay="row"
        :globalFilterFields="['name', 'isPT', 'rating', 'status']"
      >
        <Column field="id" header="ID" style="min-width: 40px"></Column>
        <Column field="name" header="Name" sortable style="min-width: 200px" :showFilterMenu="false">
          <template #body="{ data }">
            <div class="flex items-center">
              <Avatar
                icon="pi pi-user"
                class="mr-2"
                style="background-color: #2196f3; color: #ffffff"
                shape="circle"
              />
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
        <Column field="isPT" header="PT" dataType="boolean" style="min-width: 60px">
          <template #body="{ data }">
            <i
              class="pi"
              :class="{
                'pi-check-circle text-green-500': data.isPT,
                'pi-times-circle text-red-400': !data.isPT
              }"
            ></i>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <TriStateCheckbox v-model="filterModel.value" @change="filterCallback()" />
          </template>
        </Column>
        <Column field="rating" header="Rating" sortable style="min-width: 150px" :showFilterMenu="false">
          <template #body="slotProps">
            <Rating v-model="slotProps.data.rating" readonly :cancel="false" />
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
        </Column>
        <Column field="members" header=" Members" sortable style="min-width: 100px"></Column>
        <Column field="challenges" header=" Challenges" sortable style="min-width: 100px"></Column>
        <Column field="exercises" header=" Exercises" sortable style="min-width: 100px"></Column>
        <Column field="status" header=" Status" sortable style="min-width: 100px" :showFilterMenu="false">
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
          <template #body="{ index }">
            <div class="flex space-x-4">
              <Button
                label="Detail"
                size="small"
                icon="pi pi-angle-right"
                iconPos="right"
                outlined
                @click="$router.push({ name: 'creators.show', params: { id: index } })"
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
