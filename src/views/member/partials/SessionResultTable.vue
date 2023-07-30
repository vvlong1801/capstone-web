<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { ref, onMounted } from 'vue';

const results = ref([
  {
    session: 1,
    workout_day: '12/07/2023',
    time: '00:22:50',
    kcal: 350,
    heart_rate: 80,
    feedback: false
  },
  {
    session: 2,
    workout_day: '13/07/2023',
    time: '00:30:50',
    kcal: 400,
    heart_rate: 80,
    feedback: false
  },
  {
    session: 3,
    workout_day: '14/07/2023',
    time: '00:35:50',
    kcal: 550,
    heart_rate: 80,
    feedback: false
  },
  {
    session: 4,
    workout_day: '15/07/2023',
    time: '01:22:50',
    kcal: 700,
    heart_rate: 80,
    feedback: false
  },
  {
    session: 5,
    workout_day: '16/07/2023',
    time: '00:33:50',
    kcal: 350,
    heart_rate: 80,
    feedback: true,
  },
  {
    session: 5,
    workout_day: '16/07/2023',
    time: '00:40:50',
    kcal: 450,
    heart_rate: 80,
    feedback: true,
  },
  {
    session: 6,
    workout_day: '17/07/2023',
    time: '00:45:50',
    kcal: 650,
    heart_rate: 80,
    feedback: false,
  },
  {
    session: 7,
    workout_day: '18/07/2023',
    time: '00:40:50',
    kcal: 650,
    heart_rate: 80,
    feedback: true,
  },
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
