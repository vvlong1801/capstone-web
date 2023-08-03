<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import ConfirmPopup from 'primevue/confirmpopup';

import { FilterMatchMode } from 'primevue/api';
import { ref } from 'vue';
import { useConfirm } from 'primevue/useconfirm';

defineProps(['data']);
const confirm = useConfirm();

const onConfirmApprove = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to approve this member?',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        console.log("approve");
    },
    reject: () => {
      console.log("unapprove");
    }
  });
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
  level: { value: null, matchMode: FilterMatchMode.EQUALS },
  gender: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const genderOptions = ref(['male', 'female']);
const levelOptions = ref(['beginner', 'intermediate', 'advanced']);
</script>
<template>
  <div class="card space-y-6 min-h-full">
    <ConfirmPopup></ConfirmPopup>
    <DataTable
      v-model:filters="filters"
      :value="data"
      tableStyle="min-width: 50rem"
      stripedRows
      scrollable
      filterDisplay="row"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      :globalFilterFields="['name', 'gender', 'level', 'status']"
    >
      <template #empty>
        <div>No member waiting approve</div>
      </template>
      <Column field="id" header="ID" style="min-width: 40px"></Column>
      <Column field="name" header="Name" sortable style="min-width: 200px" :showFilterMenu="false">
        <template #body="{ data }">
          <div class="flex items-center">
            <Avatar
              icon="pi pi-user"
              class="mr-2 bg-indigo-500"
              shape="circle"
              :image="data.avatar?.url"
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
      <Column>
        <template #body="{ }">
          <div class="flex space-x-4">
            <Button
              label="Approve"
              size="small"
              icon="pi pi-check"
              iconPos="right"
              outlined
              severity="success"
              @click="onConfirmApprove($event)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
