<script setup>
import PracticeResult from './PracticeResult.vue'
import PracticeTimePerDay from './PracticeTimePerDay.vue'
import Stats from './Stats.vue'
</script>


<template>
  <div class="flex flex-col gap-y-4">
    <practice-result />
    
    <practice-time-per-day />

    <stats />
  </div>
</template>
