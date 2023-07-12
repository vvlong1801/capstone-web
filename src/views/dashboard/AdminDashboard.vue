<script setup>
import ColumnChart from './partials/ColumnChart.vue';
import PieChart from './partials/PieChart.vue';
import StatCard from './partials/StatCard.vue';
import TopCard from './partials/TopCard.vue';
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex gap-8">
      <stat-card></stat-card>
      <stat-card></stat-card>
      <stat-card></stat-card>
      <stat-card></stat-card>
    </div>
    <div class="flex gap-8">
      <column-chart class="flex-1"></column-chart>
      <column-chart class="flex-1"></column-chart>
    </div>
    <div class="flex gap-8">
      <column-chart class="flex-1"></column-chart>
      <column-chart class="flex-1"></column-chart>
    </div>
    <div class="flex gap-8 mb-4 w-full">
      <div class="flex-1 flex flex-col justify-between gap-4">
        <top-card></top-card>
        <top-card></top-card>
        <top-card></top-card>
      </div>
      <div class="flex-1"><pie-chart class="h-full"></pie-chart></div>
      <div class="flex-1 flex flex-col justify-between gap-4">
        <top-card></top-card>
        <top-card></top-card>
        <top-card></top-card>
      </div>
      <div class="flex-1"><pie-chart class="h-full"></pie-chart></div>
    </div>
  </div>
</template>
