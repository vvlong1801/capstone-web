<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import { FilterMatchMode } from 'primevue/api';
import { ref } from 'vue';

defineProps(["data"]);

const getSeverityStatus = (status) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'waitingApprove':
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
const statuses = ref(['approved', 'waitingApprove']);
const levelOptions = ref(['beginner', 'intermediate', 'advanced']);
</script>
<template>
    <div>
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
        <Column field="created_at" header="Join at" style="min-width: 150px" sortable :showFilterMenu="false"></Column>
        <!-- <Column field="status" header=" Status" style="min-width: 150px" :showFilterMenu="false">
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
        </Column> -->
        <Column>
          <template #body="{ data }">
            <div class="flex space-x-4">
              <Button
                label="Detail"
                size="small"
                icon="pi pi-angle-right"
                iconPos="right"
                outlined
                @click="$router.push({ name: 'member.show', params: { id: data.id } })"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    </div>
</template>