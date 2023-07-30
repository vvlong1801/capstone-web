<script setup>
import ColumnChart from './partials/ColumnChart.vue';
import PieChart from './partials/PieChart.vue';
import StatCard from './partials/StatCard.vue';

import { onMounted, computed } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';

const store = useDashboardStore();

onMounted( async () => {
  await store.getAnalysis();
});

const memberInMonthLabels = computed(() => {
  return store.data != undefined
    ? store.data.member_in_month.map((item) => item['month']).slice(0, 7)
    : [];
});

const memberInMonthData = computed(() => {
  return store.data != undefined
    ? store.data.member_in_month.map((item) => item['count']).slice(0, 7)
    : [];
});

const resultInMonthLabels = computed(() => {
  return store.data != undefined
    ? store.data.result_in_month.map((item) => item['month']).slice(0, 7)
    : [];
});

const resultInMonthData = computed(() => {
  return store.data != undefined
    ? store.data.result_in_month.map((item) => item['count']).slice(0, 7)
    : [];
});

const memberInChallengeLabels = computed(() => {
  return store.data != undefined
    ? store.data.member_in_challenge.map((item) => item['name']).slice(0, 7)
    : [];
});

const memberInChallengeData = computed(() => {
  return store.data != undefined
    ? store.data.member_in_challenge.map((item) => item['count']).slice(0, 7)
    : [];
});

const resultInChallengeLabels = computed(() => {
  return store.data != undefined
    ? store.data.result_in_challenge.map((item) => item['name']).slice(0, 7)
    : [];
});

const resultInChallengeData = computed(() => {
  return store.data != undefined
    ? store.data.result_in_challenge.map((item) => item['count']).slice(0, 7)
    : [];
});

</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex gap-8">
      <stat-card title="total members" :data="store.data?.member_count"></stat-card>
      <stat-card title="rating" :data="store.data?.rate_count"></stat-card>
      <stat-card title="session results" :data="store.data?.session_result_count"></stat-card>
      <stat-card title="challenges" :data="store.data?.challenge_count"></stat-card>
    </div>
    <div class="grid grid-cols-4 grid-rows-2 grid-flow-col gap-8 pb-8">
      <column-chart
        class="flex-1 col-span-3"
        :data="memberInMonthData"
        :labels="memberInMonthLabels"
        title="members in month"
        color="blue"
      ></column-chart>
      <column-chart
        class="flex-1 col-span-3"
        :data="resultInMonthData"
        :labels="resultInMonthLabels"
        title="session result in month"
        color="pink"
      ></column-chart>
      <pie-chart :data="memberInChallengeData" :labels="memberInChallengeLabels"></pie-chart>
      <pie-chart :data="resultInChallengeData" :labels="resultInChallengeLabels"></pie-chart>
    </div>
  </div>
</template>
