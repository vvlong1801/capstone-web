<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { onMounted, ref, watch } from 'vue';
import { useTagStore } from '@/stores/tag';

const emits = defineEmits(['selectTag']);
const store = useTagStore();
const selectedTags = ref([]);
const datatable = ref([]);

onMounted(async () => {
    await store.getTags();
    datatable.value = store.tags;
});
const typeOptions = [
  { label: 'challenge', value: 'ChallengeTag' },
  { label: 'group exercise', value: 'GroupExercise' },
  { label: 'creator technique', value: 'CreatorTechnique' }
];

watch(selectedTags, () => {
  emits('selectTag', selectedTags.value);
});

const getTypeLabel = (type) => {
  return typeOptions.filter((op) => op.value == type)[0].label;
};
</script>
<template>
  <div class="card flex flex-col space-y-6 min-h-full">
    <DataTable
      :value="datatable"
      v-model:selection="selectedTags"
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
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="name" header="Name" style="min-width: 100px"> </Column>
      <Column field="type" header="Type" style="max-width: 100px" sortable>
        <template #body="{ data }">
          <span>{{ getTypeLabel(data.type) }}</span>
        </template>
      </Column>
      <Column field="created_at" header="Created at" style="min-width: 100px" sortable> </Column>
      <Column header="Weight">
        <template #body="{ data }">
            <InputText type="text" v-model="data.weight" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
