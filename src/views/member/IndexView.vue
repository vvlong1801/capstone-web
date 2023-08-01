<script setup>
import BaseView from '@/views/BaseView.vue';
import ApprovedTable from './partials/ApprovedTable.vue';
import WaitingApprovedTable from './partials/WaitingApprovedTable.vue';
import { onMounted, computed } from 'vue';
import { useMemberStore } from '@/stores/member';

const store = useMemberStore();
onMounted(async () => {
  await store.getMembers();
});

const approvedMembers = computed(() => {
  return store.members.filter((mem) => mem.status == 'approved');
});

const waitingApproveMembers = computed(() => {
  return store.members.filter((mem) => mem.status !== 'approved');
});
</script>
<template>
  <base-view title="List Waiting Approve">
    <waiting-approved-table :data="waitingApproveMembers"></waiting-approved-table>
  </base-view>
  <base-view title="List Members" class="mt-6">
    <approved-table :data="approvedMembers"></approved-table>
  </base-view>
</template>
