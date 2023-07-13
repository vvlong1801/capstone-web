<script setup>
import ColumnChart from './partials/ColumnChart.vue';
import PieChart from './partials/PieChart.vue';
import StatCard from './partials/StatCard.vue';
import TopCard from './partials/TopCard.vue';

import { onMounted, computed } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';

const store = useDashboardStore();

// onMounted(async () => {
//   await store.getAnalysis();
// });

// const challengeInMonthLabels = computed(() => {
//   return store.data != undefined
//     ? store.data.challenge_in_month.map((item) => item['month']).slice(0, 7)
//     : [];
// });

// const challengeInMonthData = computed(() => {
//   return store.data != undefined
//     ? store.data.challenge_in_month.map((item) => item['count']).slice(0, 7)
//     : [];
// });
// const exerciseInMonthLabels = computed(() => {
//   return store.data != undefined
//     ? store.data?.exercise_in_month.map((item) => item['month']).slice(0, 7)
//     : [];
// });

// const exerciseInMonthData = computed(() => {
//   return store.data != undefined
//     ? store.data?.exercise_in_month.map((item) => item['count']).slice(0, 7)
//     : [];
// });
// const creatorInMonthLabels = computed(() => {
//   return store.data != undefined
//     ? store.data?.creator_in_month.map((item) => item['month']).slice(0, 7)
//     : [];
// });

// const creatorInMonthData = computed(() => {
//   return store.data != undefined
//     ? store.data?.creator_in_month.map((item) => item['count']).slice(0, 7)
//     : [];
// });
// const workoutUserInMonthLabels = computed(() => {
//   return store.data != undefined
//     ? store.data?.workout_user_in_month.map((item) => item['month']).slice(0, 7)
//     : [];
// });

// const workoutUserInMonthData = computed(() => {
//   return store.data != undefined
//     ? store.data.workout_user_in_month.map((item) => item['count']).slice(0, 7)
//     : [];
// });

// const pieChallengeLabels = computed(() => {
//   let topChallengeLabels = store.data?.top_challenges.map((item) => item.name);
//   return topChallengeLabels ? [...topChallengeLabels, 'total'] : [];
// });

// const pieChallengeData = computed(() => {
//   let topChallengeData = store.data?.top_challenges.map((item) => item.members_count);
//   return topChallengeData ? [...topChallengeData, store.data?.workout_users_count] : [];
// });

// const pieCreatorsLabels = computed(() => {
//   let topCreatorLabels = store.data?.top_creators.map((item) => item.creator?.name);
//   return topCreatorLabels ? [...topCreatorLabels, 'total'] : [];
// });

// const pieCreatorsData = computed(() => {
//   let topCreatorData = store.data?.top_creators.map((item) => item.total_members);
//   return topCreatorData ? [...topCreatorData, store.data?.workout_users_count] : [];
// });

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = [65, 59, 80, 81, 56, 55, 40];
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex gap-8">
      <stat-card title="total members" :data="10"></stat-card>
      <stat-card title="rating" :data="10"></stat-card>
      <stat-card title="session results" :data="10"></stat-card>
      <stat-card title="challenges" :data="10"></stat-card>
    </div>
    <div class="grid grid-cols-4 grid-rows-2 grid-flow-col gap-8 pb-8">
      <column-chart
        class="flex-1 col-span-3"
        :data="data"
        :labels="labels"
        title="members in month"
        color="blue"
      ></column-chart>
      <column-chart
        class="flex-1 col-span-3"
        :data="data"
        :labels="labels"
        title="session result in month"
        color="pink"
      ></column-chart>
      <pie-chart :data="data" :labels="labels"></pie-chart>
      <pie-chart :data="data" :labels="labels"></pie-chart>
    </div>
  </div>
</template>
