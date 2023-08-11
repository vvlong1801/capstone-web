<script setup>
import BaseView from '@/views/BaseView.vue';
import ApprovedTable from './partials/ApprovedTable.vue';
import WaitingApprovedTable from './partials/WaitingApprovedTable.vue';
import Toast from 'primevue/toast';
import { onMounted, computed } from 'vue';
import { useMemberStore } from '@/stores/member';
import { useAuthStore } from '@/stores/auth/auth';

const { isSuperAdmin, userInfo } = useAuthStore();
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

const onApprove = async (memberId) => {
  await store.approveMember(memberId);
  await store.getMembers();
};
</script>
<template>
  <div>
    <Toast />
    <base-view title="List Waiting Approve" v-if="!isSuperAdmin" class="mb-6">
      <waiting-approved-table
        :data="waitingApproveMembers"
        @approve="onApprove"
      ></waiting-approved-table>
    </base-view>
    <base-view title="List Members">
      <approved-table :data="approvedMembers"></approved-table>
    </base-view>
  </div>
</template>
