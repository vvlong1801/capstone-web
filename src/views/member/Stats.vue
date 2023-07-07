<script setup>
import DashboardCard from '../dashboard/Card.vue'

const DUMMY_DATA = [
  { title: 'Total practice days', content: 48 },
  { title: 'Total practice time', content: 326 },
  { title: 'Total calories (kcal)', content: 674 },
]

</script>

<template>
  <p class="mb-2">Total stats</p>
  <div class="grid grid-cols-3 gap-x-4">
    <dashboard-card 
      v-for="card in DUMMY_DATA"
      :card="card"
      :key="card.title"
    />
  </div>
</template>
