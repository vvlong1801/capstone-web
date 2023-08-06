<script setup>
import ChallengeCard from './partials/ChallengeCard.vue';
import BaseView from '../BaseView.vue';
import FilterBox from './partials/FilterBox.vue';
import ConfirmDialog from 'primevue/confirmdialog';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useChallengeStore } from '@/stores/challenge';
import { useConfirm } from 'primevue/useconfirm';
import { useStorage } from '@vueuse/core';
const showSideBar = useStorage('showSideBar', true);

const confirm = useConfirm();
const filterBoxVisible = ref(false);
const filteredChallenge = ref([]);

const router = useRouter();
const store = useChallengeStore();
onMounted(store.getChallenges);
const onCreate = () => {
  store.form = {};
  router.push({ name: 'challenges.create' });
};

const showFilterBox = () => {
  filterBoxVisible.value = !filterBoxVisible.value;
};

const onFilter = (data) => {
  filteredChallenge.value = data;
};

const onDelete = (challengeId) => {
  confirm.require({
    message: 'Are you sure you want to delete?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      await store.deleteChallenge(challengeId);
    },
    reject: () => {
      // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  });
};
</script>
<template>
  <base-view title="Challenges">
    <!-- <Toast /> -->
    <ConfirmDialog></ConfirmDialog>
    <filter-box
      :data="store.challenges"
      :visible="filterBoxVisible"
      @update:data="onFilter"
    ></filter-box>
    <div class="card space-y-6 min-h-full">
      <Toolbar>
        <template #start>
          <Button
            type="button"
            icon="pi pi-plus"
            class="!mr-2 p-button-rounded"
            @click="onCreate"
          />
          <Button
            :icon="`pi ${filterBoxVisible ? 'pi-filter-slash' : 'pi-filter'}`"
            class="p-button-rounded p-button-secondary !border-none"
            @click="showFilterBox"
          />
        </template>
        <template #end>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Search..." />
          </span>
        </template>
      </Toolbar>
      <div
        class="w-full grid md:grid-cols-4 gap-6"
        :class="{ '2xl:grid-cols-4': !showSideBar, '2xl:grid-cols-3': showSideBar }"
      >
        <challenge-card
          v-for="challenge in store.challenges"
          :key="challenge.id"
          :challenge="challenge"
          @delete="onDelete"
        />
      </div>
    </div>
  </base-view>
</template>
