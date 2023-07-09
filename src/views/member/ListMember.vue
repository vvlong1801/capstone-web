<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import { MemberService } from '@/services/member';

onMounted(() => {
  MemberService.getCustomersMedium().then((data) => (members.value = data));
});

const members = ref();

const onDelete = (index) => {
  console.log(index)
};

</script>


<template>
  <h4 class="mb-2 text-xl">List Members</h4>
   <div class="card">
      <DataTable :value="members" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
          <Column field="name" header="Name" style="width: 16%"></Column>
          <Column field="email" header="Email" style="width: 16%"></Column>
          <Column field="start_day" header="Day started" style="width: 16%"></Column>
          <Column field="amount_day_practice" header="Amount day practice" style="width: 16%"></Column>
          <Column field="practice_status" header="Practice status" style="width: 16%">
            
          </Column>
          <Column  style="width: 8%">
            <template #body="{ index }">
              <Button
                label="Detail"
                rounded
                size="small"
                icon="pi pi-angle-right"
                iconPos="right"
                text
                outlined
                @click="$router.push({ name: 'member.show', params: { id: index } })"
              />
            </template>
          </Column>
          <Column style="width: 8%">
            <template #body="{ index }">
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                rounded
                aria-label="delete"
                @click="onDelete(index)"
              />
            </template>
          </Column>
      </DataTable>
    </div>
</template>