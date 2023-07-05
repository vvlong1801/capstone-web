<script setup>
import ChallengeCard from './partials/ChallengeCard.vue';
import BaseView from '../BaseView.vue';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useChallengeStore } from '@/stores/challenge';

const router = useRouter();
const store = useChallengeStore();
onMounted(store.getChallenges);
const onCreate = () => {
  store.form = {};
  router.push({ name: 'challenges.create' });
};
</script>
<template>
  <base-view title="Challenges">
    <!-- <Toast /> -->
    <div class="card space-y-6 min-h-full">
      <Toolbar>
        <template #start>
          <Button
            type="button"
            icon="pi pi-plus"
            class="!mr-2 p-button-rounded"
            @click="onCreate"
          />
          <Button icon="pi pi-filter" class="p-button-rounded p-button-secondary !border-none" />
        </template>
        <template #end>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Search..." />
          </span>
        </template>
      </Toolbar>
      <div class="w-full grid 2xl:grid-cols-4 md:grid-cols-3 gap-6">
        <challenge-card v-for="challenge in store.challenges" :key="challenge.id" :challenge="challenge"/>
        <!-- <Card v-for="challenge in store.challenges" :key="challenge.id">
          <template #header>
            <img alt="challenge cover" :src="challenge.image?.url" class="rounded-t" />
          </template>
          <template #title>
            <div class="flex justify-between items-center">
              <div>{{ challenge.name }}</div>
              <Badge value="active" class="p-badge-success" />
            </div>
          </template>
          <template #subtitle>
            <div class="flex justify-between items-center">
              <div>{{ challenge.type }}</div>
              <Badge :value="`${challenge.exercises_count} exercises`" class="p-badge-success" />
            </div>
          </template>
          <template #footer>
            <div class="flex justify-end space-x-2">
              <Button
                icon="pi pi-pencil"
                aria-label="Edit"
                @click="
                  $router.push({
                    name: 'challenges.edit',
                    params: {
                      id: challenge.id
                    }
                  })
                "
                class="p-button-sm"
              />
              <Button
                icon="pi pi-trash"
                aria-label="Delete"
                class="p-button-danger p-button-sm"
                @click="store.deleteChallenge(challenge.id)"
              />
            </div>
          </template>
        </Card> -->
      </div>
    </div>
  </base-view>
</template>
