<script setup>
import ColumnChart from './partials/ColumnChart.vue';
import PieChart from './partials/PieChart.vue';
import StatCard from './partials/StatCard.vue';
import TopCard from './partials/TopCard.vue';

import { onMounted, computed } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';

const store = useDashboardStore();

onMounted(async () => {
  await store.getAnalysis();
});

const challengeInMonthLabels = computed(() => {
  return store.data != undefined
    ? store.data.challenge_in_month.map((item) => item['month']).slice(0, 7)
    : [];
});

const challengeInMonthData = computed(() => {
  return store.data != undefined
    ? store.data.challenge_in_month.map((item) => item['count']).slice(0, 7)
    : [];
});
const exerciseInMonthLabels = computed(() => {
  return store.data != undefined
    ? store.data?.exercise_in_month.map((item) => item['month']).slice(0, 7)
    : [];
});

const exerciseInMonthData = computed(() => {
  return store.data != undefined
    ? store.data?.exercise_in_month.map((item) => item['count']).slice(0, 7)
    : [];
});
const creatorInMonthLabels = computed(() => {
  return store.data != undefined
    ? store.data?.creator_in_month.map((item) => item['month']).slice(0, 7)
    : [];
});

const creatorInMonthData = computed(() => {
  return store.data != undefined
    ? store.data?.creator_in_month.map((item) => item['count']).slice(0, 7)
    : [];
});
const workoutUserInMonthLabels = computed(() => {
  return store.data != undefined
    ? store.data?.workout_user_in_month.map((item) => item['month']).slice(0, 7)
    : [];
});

const workoutUserInMonthData = computed(() => {
  return store.data != undefined
    ? store.data.workout_user_in_month.map((item) => item['count']).slice(0, 7)
    : [];
});

const pieChallengeLabels = computed(() => {
  let topChallengeLabels = store.data?.top_challenges.map((item) => item.name);
  return topChallengeLabels ? [...topChallengeLabels, 'total'] : [];
});

const pieChallengeData = computed(() => {
  let topChallengeData = store.data?.top_challenges.map((item) => item.members_count);
  return topChallengeData ? [...topChallengeData, store.data?.workout_users_count] : [];
});

const pieCreatorsLabels = computed(() => {
  let topCreatorLabels = store.data?.top_creators.map((item) => item.creator?.name);
  return topCreatorLabels ? [...topCreatorLabels, 'total'] : [];
});

const pieCreatorsData = computed(() => {
  let topCreatorData = store.data?.top_creators.map((item) => item.total_members);
  return topCreatorData ? [...topCreatorData, store.data?.workout_users_count] : [];
});
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex gap-8">
      <stat-card title="workout users" :data="store.data?.workout_users_count"></stat-card>
      <stat-card title="creators" :data="store.data?.creators_count"></stat-card>
      <stat-card title="challenges" :data="store.data?.challenges_count"></stat-card>
      <stat-card title="exercises" :data="store.data?.exercises_count"></stat-card>
    </div>
    <div class="grid grid-cols-2 grid-rows-2 grid-flow-col gap-8">
      <column-chart
        class="flex-1"
        :data="workoutUserInMonthData"
        :labels="workoutUserInMonthLabels"
        title="workout users in month"
        color="blue"
      ></column-chart>
      <column-chart
        class="flex-1"
        :data="creatorInMonthData"
        :labels="creatorInMonthLabels"
        title="creator in month"
        color="pink"
      ></column-chart>
      <column-chart
        class="flex-1"
        :data="challengeInMonthData"
        :labels="challengeInMonthLabels"
        title="challenges in month"
        color="green"
      ></column-chart>
      <column-chart
        class="flex-1"
        :data="exerciseInMonthData"
        :labels="exerciseInMonthLabels"
        title="exercise in month"
        color="yellow"
      ></column-chart>
    </div>
    <div class="flex gap-8 mb-4 w-full">
      <div class="flex-1 flex flex-col justify-between gap-4">
        <top-card
          v-for="challenge in store.data?.top_challenges"
          :title="challenge.name"
          :image="challenge.main_image"
          :members_count="challenge.members_count"
          :key="challenge.id"
        ></top-card>
      </div>
      <div class="flex-1">
        <column-chart
          class="h-full flex"
          :data="pieChallengeData"
          :labels="pieChallengeLabels"
          title="members of challenge"
        ></column-chart>
      </div>
      <div class="flex-1 flex flex-col justify-between gap-4">
        <top-card
          v-for="item in store.data?.top_creators"
          :title="item.creator.name"
          :members_count="item.total_members"
          :key="item.creator.id"
        ></top-card>
      </div>
      <div class="flex-1">
        <column-chart
          class="h-full flex"
          :data="pieCreatorsData"
          :labels="pieCreatorsLabels"
          title="members of creator"
        ></column-chart>
      </div>
    </div>
  </div>
</template>
