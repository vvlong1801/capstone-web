<script setup>
import BaseView from '@/views/BaseView.vue';
import CreatorTable from './tables/CreatorTable.vue';
import RequestTable from './tables/RequestTable.vue';

import { onMounted } from 'vue';
import { useCreatorStore } from '@/stores/creator';

const store = useCreatorStore();

onMounted(async () => {
  await store.getCreators();
  await store.getPersonalTrainerRequests();
});
</script>
<template>
  <base-view title="List Creators">
    <div class="flex flex-col gap-8">
      <creator-table :datatable="store.listCreators"></creator-table>
      <request-table :datatable="store.listRequests"></request-table>
    </div>
  </base-view>
</template>
