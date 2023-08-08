<script setup>
import { FilterMatchMode } from 'primevue/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Image from 'primevue/image';
import BaseView from '@/views/BaseView.vue';
import CreateDialog from './partials/CreateDialog.vue';
import { ref, onMounted } from 'vue';
import { useCertificateStore } from '@/stores/certificate';

const store = useCertificateStore();
onMounted(store.getCertificates);
const visible = ref(false);

const openCreateDialog = () => {
  visible.value = true;
};
</script>
<template>
  <base-view title="certificate issuers">
    <create-dialog v-model:visible="visible"></create-dialog>
    <div class="card flex flex-col space-y-6 min-h-full">
      <Toolbar>
        <template #start>
          <Button
            icon="pi pi-plus"
            class="p-button-rounded p-button-primary !bg-primary-500 !border-none"
            @click="openCreateDialog"
          />
          <Toast />
        </template>
        <template #end>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText type="text" v-model="searchKey" placeholder="Search" />
          </span>
        </template>
      </Toolbar>

      <DataTable
        :value="store.certificates"
        stripedRows
        tableStyle="max-width: 100%"
        scrollable
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :globalFilterFields="['name', 'description', 'created_at']"
      >
        <template #empty> No certificate issuer. </template>
        <template #loading> Loading certificate issuers data. Please wait. </template>
        <Column field="id" header="ID" style="min-width: 20px"> </Column>
        <Column field="name" header="Name" style="min-width: 100px"> </Column>
        <Column field="created_at" header="Created at" style="min-width: 100px" sortable> </Column>
        <Column field="description" header="Description" style="max-width: 500px">
          <template #body="{ data }">
            <p
              class="truncate"
              v-tooltip.top="{
                value: data.description,
                class: 'custom-tooltip',
                fitContent: false
              }"
            >
              {{ data.description }}
            </p>
          </template>
        </Column>
        <Column header="Example">
          <template #body="{ data }">
            <Image :src="data.example?.url" alt="Image" width="60" preview />
          </template>
        </Column>
        <Column>
          <template #body="{ data }">
            <Button
              icon="pi pi-lock"
              severity="warning"
              text
              rounded
              @click="store.lockCertificate(data.id)"
              v-if="data.status == 'active'"
            ></Button>
            <Button
              icon="pi pi-lock-open"
              severity="info"
              text
              rounded
              @click="store.unlockCertificate(data.id)"
              v-else
            ></Button>
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              rounded
              @click="store.deleteCertificate(data.id)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>
  </base-view>
</template>
<style scoped>
.custom-tooltip.p-tooltip-top .p-tooltip-arrow{
  width: 400px !important;
}
</style>
