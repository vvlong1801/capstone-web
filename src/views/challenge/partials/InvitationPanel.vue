<script setup>
import InputSwitch from 'primevue/inputswitch';
import DataTable from 'primevue/datatable';
import Message from 'primevue/message';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import AutoComplete from 'primevue/autocomplete';
import { ref, computed, watch, watchEffect } from 'vue';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth/auth';
const { isSuperAdmin } = useAuthStore();
const props = defineProps({
  invitations: {
    default: []
  },
  acceptAll: {
    default: true
  },
  members: {
    default: []
  }
});

const emits = defineEmits(['update']);
const userStore = useUserStore();
const addError = ref(false);
const messageError = ref('');

const globalSearchKey = ref('');
const globalSearchOptions = ref([]);
const selectingRole = ref('Member');
const selectingMember = ref({});
const datatableSearchKey = ref('');
const datatable = ref([]);
const acceptAllRef = ref(true);

watchEffect(() => {
  datatable.value = props.invitations;
  acceptAllRef.value = props.acceptAll;
});

const onSearch = async () => {
  await userStore.getUsersByKeyWord(globalSearchKey.value);
  globalSearchOptions.value = userStore.users;
};
const roles = ['Member', 'SubAdmin'];

const datatableAfterSearch = computed(() => {
  return datatable.value?.filter((item) => {
    return (
      item.email.toLowerCase().includes(datatableSearchKey.value.toLowerCase()) ||
      item.phone_number.toLowerCase().includes(datatableSearchKey.value.toLowerCase()) ||
      item.name.toLowerCase().includes(datatableSearchKey.value.toLowerCase()) ||
      item.role.toLowerCase().includes(datatableSearchKey.value.toLowerCase())
    );
  });
});

const onSelect = ({ value: selectedOption }) => {
  selectedOption.role = selectingRole.value;
  selectedOption.canDelete = true;
  selectingMember.value = selectedOption;
};

watch(selectingRole, () => {
  if (selectingMember.value) {
    selectingMember.value.role = selectingRole.value;
  } else {
    console.log('aaaa');
  }
});

const onAddToDatabase = () => {
  let memberFiltered = props.members.filter((item) => selectingMember.value.id === item.id);
  if (memberFiltered.length > 0) {
    addError.value = true;
    messageError.value = 'user has been member';
    return;
  }
  if (selectingMember.value !== undefined && selectingMember.value.name !== undefined) {
    let filtered = datatable.value.filter((item) => item.id === selectingMember.value.id);
    if (filtered.length > 0) {
      addError.value = true;
      messageError.value = 'user existed on under table';
    } else {
      datatable.value = [...datatable.value, selectingMember.value];
      selectingMember.value = {};
      globalSearchKey.value = '';
      addError.value = false;
    }
  }
};

const onDelete = (index) => {
  if (datatable.value[index].canDelete) {
    datatable.value.splice(index, 1);
  }
};

const onSave = () => {
  let newInvitations = datatable.value.slice(props.invitations.length);

  emits('update', { accept_all: acceptAllRef.value, invitations: newInvitations });
};

const onCloseMessage = () => {
  addError.value = false;
  messageError.value = '';
};
</script>
<template>
  <div class="flex flex-col gap-8">
    <Message severity="error" v-if="addError" @close="onCloseMessage">{{ messageError }}</Message>
    <div class="flex justify-between">
      <div class="flex items-center">
        <InputSwitch v-model="acceptAllRef" />
        <p class="ml-4 font-semibold">Accept All</p>
      </div>
      <Button icon="pi pi-check" label="Save" severity="warning" @click="onSave"></Button>
    </div>
    <div class="flex space-x-6 w-full" v-if="!isSuperAdmin">
      <AutoComplete
        v-model="globalSearchKey"
        :suggestions="globalSearchOptions"
        @complete="onSearch"
        optionLabel="name"
        placeholder="Enter email, phone number ..."
        inputClass="w-full"
        class="grow"
        @item-select="onSelect"
      >
        <template #option="{ option }">
          <div class="flex space-x-4 items-center">
            <Avatar
              :label="option.name[0].toUpperCase()"
              class="mr-2 h-full"
              size="large"
              style="background-color: #9c27b0; color: #ffffff"
              shape="circle"
            />
            <div>
              <h3 class="font-semibold text-lg">{{ option.name }}</h3>
              <p>{{ option.email }}</p>
            </div>
          </div>
        </template>
      </AutoComplete>
      <Dropdown v-model="selectingRole" :options="roles" placeholder="Select Role" class="w-1/4" />
      <Button icon="pi pi-plus" rounded aria-label="Add" @click="onAddToDatabase" />
    </div>
    <DataTable :value="datatableAfterSearch" paginator :rows="10" dataKey="id">
      <template #header>
        <div class="flex justify-content-end">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="datatableSearchKey" placeholder="Keyword Search" />
          </span>
        </div>
      </template>
      <template #empty> No members is invited. </template>
      <template #loading> Loading members data. Please wait. </template>
      <Column header="#" class="w-1/12">
        <template #body="{ index }">
          <span>{{ index + 1 }}</span>
        </template>
      </Column>
      <Column field="name" header="Name" class="w-1/4">
        <template #body="{ data }">
          <div class="flex items-center">
            <Avatar
              :label="data.name[0].toUpperCase()"
              class="mr-2 h-full"
              style="background-color: #9c27b0; color: #ffffff"
              shape="circle"
            />
            <p>{{ data.name }}</p>
          </div>
        </template>
      </Column>
      <Column field="email" header="Email" class="w-1/4"> </Column>
      <Column field="phone_number" header="Phone Number" class="w-1/4"> </Column>
      <Column field="role" header="Role" class="w-1/4"> </Column>
      <Column class="w-1/6">
        <template #body="{ index, data }">
          <Button
            icon="pi pi-trash"
            severity="danger"
            text
            rounded
            aria-label="delete"
            @click="onDelete(index)"
            v-if="data.canDelete"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
