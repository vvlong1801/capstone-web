<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

defineProps(["data"]);
</script>
<template>
  <div class="card">
    <DataTable :value="data" tableStyle="min-width: 50rem" paginator  :rows="5" :rowsPerPageOptions="[5, 10]">
      <Column field="session_order" header="Session"></Column>
      <Column field="workout_day" header="Workout Day"></Column>
      <Column field="duration" header="Time"></Column>
      <Column field="calo" header="Kcal"></Column>
      <Column field="heart_rate" header="Heart rate"></Column>
      <Column field="feedback" header="Feedback">
        <template #body="{ data }">
            <i class="pi" :class="{ 'pi-check-circle text-green-500': data.feedback, 'pi-times-circle text-red-400': !data.feedback }"></i>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
