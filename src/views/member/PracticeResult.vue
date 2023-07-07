<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import { DetailMemberService } from '@/services/member';

onMounted(() => {
  DetailMemberService.getCustomersMedium().then((data) => (detailMember.value = data));
});

const detailMember = ref();
</script>


<template>
    <div>
      <p class="mb-2">Practice Result</p>
      <!-- Table -->
      <DataTable :value="detailMember" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
          <Column field="challenge_name" header="Challenge Name" style="width: 16%"></Column>
          <Column field="total_day" header="Total Day" style="width: 16%"></Column>
          <Column field="total_practice_time" header="Total Practice Time" style="width: 16%"></Column>
          <Column field="total_calo" header="Total Calories(Kcal)" style="width: 16%"></Column>
      </DataTable>
    </div>
</template>
