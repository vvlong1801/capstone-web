<script setup>
import { FilterMatchMode } from 'primevue/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import BaseView from '@/views/BaseView.vue';
import CreateDialog from './partials/CreateDialog.vue';
import { ref, onMounted } from 'vue';
import { useTagStore } from '@/stores/tag';

const store = useTagStore();
onMounted(store.getTags);
const visible = ref(false);

const openCreateDialog = () => {
  visible.value = true;
};

const typeOptions = [
  { label: 'challenge', value: 'ChallengeTag' },
  { label: 'group exercise', value: 'GroupExercise' },
  { label: 'creator technique', value: 'CreatorTechnique' }
];

const getTypeLabel = (type) => {
  return typeOptions.filter((op) => op.value == type)[0].label;
};

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  type: { value: null, matchMode: FilterMatchMode.EQUALS },
  created_by: { value: null, matchMode: FilterMatchMode.IN }
});
</script>
<template>
  <base-view title="Tags">
    <create-dialog v-model:visible="visible"></create-dialog>
    <div class="card flex flex-col space-y-6 min-h-full">
      <Toolbar>
        <template #start>
          <Button
            icon="pi pi-plus"
            class="p-button-rounded p-button-primary !bg-primary-500 !border-none"
            @click="openCreateDialog"
          />
          <Toast />
        </template>
        <template #end>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText type="text" v-model="searchKey" placeholder="Search" />
          </span>
        </template>
      </Toolbar>

      <DataTable
        v-model:filters="filters"
        :value="store.tags"
        stripedRows
        tableStyle="max-width: 100%"
        scrollable
        filterDisplay="row"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :globalFilterFields="['name', 'admin', 'type']"
      >
        <template #empty> No tags. </template>
        <template #loading> Loading tags data. Please wait. </template>
        <Column field="id" header="ID" style="min-width: 20px"> </Column>
        <Column field="name" header="Name" style="min-width: 100px" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by name"
            />
          </template>
        </Column>
        <Column field="type" header="Type" style="max-width: 100px" :showFilterMenu="false">
          <template #body="{ data }">
            <span>{{ getTypeLabel(data.type) }}</span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="typeOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select Type"
              class="p-column-filter"
              style="min-width: 8rem"
              :showClear="true"
            >
            </Dropdown>
          </template>
        </Column>
        <Column field="created_by" header="Created By" style="min-width: 100px"> </Column>
        <Column field="created_at" header="Created at" style="min-width: 100px" sortable> </Column>
        <Column>
          <template #body="{ data }">
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              rounded
              @click="store.deleteTag(data.id)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>
  </base-view>
</template>
<style scoped>
.custom-tooltip.p-tooltip-top .p-tooltip-arrow {
  width: 400px !important;
}
</style>
