<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row'; 
import { ref, onMounted } from 'vue';
import { MemberService } from '@/services/member';

onMounted(() => {
  MemberService.getCustomersMedium().then((data) => (members.value = data));
});

const members = ref();
</script>


<template>
  <h4 class="mb-2 text-xl">List Members</h4>
   <div class="card">
      <DataTable :value="members" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
          <Column field="name" header="Name" style="width: 16%"></Column>
          <Column field="email" header="Email" style="width: 16%"></Column>
          <Column field="start_day" header="Day started" style="width: 16%"></Column>
          <Column field="amount_day_practice" header="Amount day practice" style="width: 16%"></Column>
          <Column field="practice_status" header="Practice status" style="width: 16%"></Column>
          <Column  header="Action" style="width: 16%"></Column>
      </DataTable>
    </div>
</template>