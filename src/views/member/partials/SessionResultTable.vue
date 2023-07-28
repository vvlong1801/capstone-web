<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { ref, onMounted } from 'vue';

const results = ref([
  {
    session: 3,
    workout_day: '12/07/2023',
    time: '00:22:50',
    kcal: 23,
    heart_rate: 80,
    feedback: false
  },
  {
    session: 3,
    workout_day: '12/07/2023',
    time: '00:22:50',
    kcal: 23,
    heart_rate: 80,
    feedback: true,
  }
]);
</script>

<template>
  <div class="card">
    <DataTable :value="results" tableStyle="min-width: 50rem">
      <Column field="session" header="Session"></Column>
      <Column field="workout_day" header="Workout Day"></Column>
      <Column field="time" header="Time"></Column>
      <Column field="kcal" header="Kcal"></Column>
      <Column field="heart_rate" header="Heart rate"></Column>
      <Column field="feedback" header="Feedback"></Column>
    </DataTable>
  </div>
</template>
