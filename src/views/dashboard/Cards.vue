<script setup>
import DashboardCard from './Card.vue'

const DUMMY_DATA = [
  { title: 'Total members', content: 129 },
  { title: 'Total creator', content: 36 },
  { title: 'Total challenges', content: 46 },
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
