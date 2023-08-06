<script setup>
import InputSwitch from 'primevue/inputswitch';
import DataTable from 'primevue/datatable';
import Avatar from 'primevue/avatar';
import AutoComplete from 'primevue/autocomplete';
import Column from 'primevue/column';
import { ref, watch, onMounted, computed } from 'vue';
import { useChallengeStore } from '@/stores/challenge';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const challengeStore = useChallengeStore();

onMounted(() => {
  if (challengeStore.form.invitation === undefined) {
    challengeStore.form.invitation = [];
  }
});

const roles = ['Member', 'SubAdmin'];

const acceptAll = ref(true);
const selectingRole = ref('Member');
const selectingMember = ref({});
const datatableSearchKey = ref('');

const globalSearchKey = ref('');
const globalSearchOptions = ref([]);

const onSearch = async () => {
  await userStore.getUsersByKeyWord(globalSearchKey.value);
  globalSearchOptions.value = userStore.users;
};

const datatableAfterSearch = computed(() => {
  return challengeStore.form.invitation?.filter((item) => {
    return (
      item.email.toLowerCase().includes(datatableSearchKey.value.toLowerCase()) ||
      item.phone_number.toLowerCase().includes(datatableSearchKey.value.toLowerCase()) ||
      item.name.toLowerCase().includes(datatableSearchKey.value.toLowerCase()) ||
      item.role.toLowerCase().includes(datatableSearchKey.value.toLowerCase())
    );
  });
});

watch(selectingRole, () => {
  if (selectingMember.value) {
    selectingMember.value.role = selectingRole.value;
  } else {
    console.log('aaaa');
  }
});

const onSelect = ({ value: selectedOption }) => {
  selectedOption.role = selectingRole.value;
  selectingMember.value = selectedOption;
  console.log(selectingMember.value);
};

const onAddToDatabase = () => {
  if (selectingMember.value !== undefined && selectingMember.value.name !== undefined) {
    let filtered = challengeStore.form.invitation.filter(
      (item) =>
        item.email === selectingMember.value.email && item.role === selectingMember.value.role
    );
    if (filtered.length > 0) {
      console.log('existed');
    } else {
      challengeStore.form.invitation = [...challengeStore.form.invitation, selectingMember.value];
      selectingMember.value = {};
      globalSearchKey.value = '';
    }
  }
};

const onDelete = (index) => {
  challengeStore.form.invitation.splice(index, 1);
};

const onSubmit = () => {
  challengeStore.createChallenge();
};

watch(acceptAll, () => {
  challengeStore.form.accept_all = acceptAll.value;
})
</script>
<template>
  <div class="flex flex-col gap-8">
    <Toast />
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-semibold">Send Invitation</h1>
        <h3 class="text-sm p-text-secondary">Send join challenge invitation by email</h3>
      </div>
      <div class="flex items-center">
        <InputSwitch v-model="acceptAll" />
        <p class="ml-4 font-semibold">Accept All</p>
      </div>
    </div>
    <div class="flex space-x-6 w-full">
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
    <div class="flex justify-between">
      <Button
        label="Back"
        icon="pi pi-arrow-left"
        severity="secondary"
        @click="$router.push({ name: 'challenges.create.step_two' })"
      />
      <Button label="Submit" icon="pi pi-check" @click="onSubmit" />
    </div>
  </div>
</template>
