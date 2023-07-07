<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import { InvitationService } from '@/services/invitation';

onMounted(() => {
  InvitationService.getCustomersMedium().then((data) => (invitations.value = data));
});

const invitations = ref();

const onApprove = (index) => {
  console.log('onApprove', index)
};

const onDelete = (index) => {
  console.log('onApprove', index)
};

</script>


<template>
  <h4 class="mb-2 text-xl">List invitations & Request joins</h4>
   <div class="card">
      <DataTable :value="invitations" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
          <Column field="name" header="Name" style="width: 16%"></Column>
          <Column field="challenge_name" header="Challenge" style="width: 16%"></Column>
          <Column field="type" header="Type" style="width: 16%"></Column>
          <Column field="created_at" header="Created at" style="width: 16%"></Column>
          <Column field="role" header="Role" style="width: 16%">
            
          </Column>
          <Column  style="width: 8%">
            <template #body="{ index }">
              <Button
                icon="pi pi-check"
                severity="success"
                text
                rounded
                aria-label="Approve"
                @click="onApprove(index)"
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