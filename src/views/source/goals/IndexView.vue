<script setup>
import { FilterMatchMode } from 'primevue/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import BaseView from '@/views/BaseView.vue';
import CreateDialog from './partials/CreateDialog.vue';
import { ref, onMounted, computed } from 'vue';
import { useGoalStore } from '@/stores/goal';

const store = useGoalStore();
onMounted(store.getGoals);
const visible = ref(false);
const goalIndex = ref(0);

const openCreateDialog = () => {
  visible.value = true;
};

const goalTags = computed(() => {
  let result = store.goals.filter((goal, index) => index == goalIndex.value);
  console.log(result);
  return result[0]?.tags ?? [];
});

const typeOptions = [
  { label: 'challenge', value: 'ChallengeTag' },
  { label: 'group exercise', value: 'GroupExercise' },
  { label: 'creator technique', value: 'CreatorTechnique' }
];

const getTypeLabel = (type) => {
  return typeOptions.filter((op) => op.value == type)[0].label;
};

const showTags = (index) => (goalIndex.value = index);
</script>
<template>
  <div class="flex gap-6">
    <base-view title="Goals">
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
          :value="store.goals"
          stripedRows
          tableStyle="max-width: 100%"
          scrollable
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          :globalFilterFields="['name', 'description', 'created_at']"
        >
          <template #empty> No goal issuer. </template>
          <template #loading> Loading goals data. Please wait. </template>
          <Column field="id" header="ID" style="min-width: 20px"> </Column>
          <Column field="name" header="Name" style="min-width: 100px"> </Column>
          <Column field="created_at" header="Created at" style="min-width: 100px" sortable>
          </Column>
          <Column>
            <template #body="{ data, index }">
              <Button
                icon="pi pi-arrow-right"
                severity="info"
                text
                rounded
                v-tooltip="{value: 'show mapping tags'}"
                @click="showTags(index)"
              ></Button>
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                rounded
                @click="store.deleteGoal(data.id)"
              ></Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </base-view>
    <base-view title="Mapping Tags">
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
          :value="goalTags"
          stripedRows
          tableStyle="max-width: 100%"
          scrollable
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          :globalFilterFields="['name', 'created_at']"
        >
          <template #empty> No tags. </template>
          <template #loading> Loading tags data. Please wait. </template>
          <Column field="id" header="ID" style="min-width: 20px"> </Column>
          <Column field="name" header="Name" style="min-width: 100px"> </Column>
          <Column field="type" header="Type" style="max-width: 100px">
            <template #body="{ data }">
              <span>{{ getTypeLabel(data.type) }}</span>
            </template>
          </Column>
          <Column field="weight" header="Weight" style="min-width: 100px" sortable> </Column>
          <Column field="created_at" header="Created at" style="min-width: 100px" sortable>
          </Column>
          <Column>
            <template #body="{ data }">
              <Button icon="pi pi-trash" severity="danger" text rounded></Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </base-view>
  </div>
</template>
<style scoped>
.custom-tooltip.p-tooltip-top .p-tooltip-arrow {
  width: 400px !important;
}
</style>
