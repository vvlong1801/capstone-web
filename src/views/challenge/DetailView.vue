<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import BaseView from '../BaseView.vue';
import SessionComponent from './partials/SessionComponent.vue';
import Panel from 'primevue/panel';
import Inplace from 'primevue/inplace';
import OverlayPanel from 'primevue/overlaypanel';
import Dialog from 'primevue/dialog';
import StepOne from './forms/StepOne.vue';

import { useConfirm } from 'primevue/useconfirm';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useChallengeStore } from '@/stores/challenge';
import { useAuthStore } from '@/stores/auth/auth';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const store = useChallengeStore();
const toast = useToast();

const { isSuperAdmin } = useAuthStore();
const confirm = useConfirm();

const editBasicInfo = ref(false);
const editTemplate = ref(false);
const id = route.params.id;

onMounted(async () => {
  await store.getChallengeById(id);
  console.log(store.detailChallenge);
});

const showEditBasicInfo = () => {
  store.form = JSON.parse(JSON.stringify(store.detailChallenge.information));
  editBasicInfo.value = true;
};

const onUpdateBasicInfo = async (data) => {
  console.log(data);
  await store.updateBasicInfo(id, data);
  await store.getChallengeById(id);
  editBasicInfo.value = false;
  store.form = {};
};
const onCancelBasicInfo = () => {
  editBasicInfo.value = false;
  store.form = {};
};

const onApprove = () => {
  confirm.require({
    message: 'Are you sure you want to appove this challenge',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      await store.approveChallenge(id, { approve: true });
      await store.getChallengeById(id);
      // toast.add({
      //   severity: 'info',
      //   summary: 'Confirmed',
      //   detail: 'You have accepted',
      //   life: 3000
      // });
    },
    reject: () => {}
  });
};

const onUnApprove = () => {};
</script>
<template>
  <base-view title="Detail Challenge">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="flex space-x-6">
      <div class="w-full space-y-6 min-h-full">
        <div class="flex space-x-6" v-if="!isSuperAdmin">
          <div class="card flex-1 min-h-[100px] text-center text-lg font-medium">
            <p class="text-slate-500">Feedback</p>
            <p class="font-bold text-2xl">0</p>
          </div>
          <div class="card flex-1 text-center text-lg font-medium">
            <p class="text-slate-500">member</p>
            <p class="font-bold text-2xl">0</p>
          </div>
          <div class="card flex-1 text-center text-lg font-medium">
            <p class="text-slate-500">Hours</p>
            <p class="font-bold text-2xl">0</p>
          </div>
          <div class="card flex-1 text-center text-lg font-medium">
            <p class="text-slate-500">Report</p>
            <p class="font-bold text-2xl">0</p>
          </div>

        </div>
        <div class="card min-h-[800px]">
          <TabView class="tabview-custom" :activeIndex="0">
            <TabPanel>
              <template #header>
                <i class="pi pi-info-circle"></i>
                <p class="ml-2">Basic Information</p>
              </template>
              <div class="space-y-4">
                <div class="flex justify-between items-center space-x-6">
                  <div class="flex space-x-2 items-center">
                    <i class="pi pi-tags" style="font-size: 1.25rem"></i>
                    <Chip
                      :label="tag.name"
                      class="!text-sm"
                      v-for="tag in store.detailChallenge.information.tags"
                      :key="tag.id"
                    ></Chip>
                  </div>
                  <div v-if="isSuperAdmin && store.detailChallenge.information.status == 'init'">
                    <Button
                      label="Unapprove"
                      severity="secondary"
                      text
                      icon="pi pi-times"
                      class="cursor-pointer"
                      @click="onUnApprove"
                    />
                    <Button
                      label="Approve"
                      severity="warning"
                      text
                      icon="pi pi-check"
                      class="cursor-pointer"
                      @click="onApprove"
                    />
                  </div>
                  <Button
                    label="Edit"
                    severity="warning"
                    text
                    icon="pi pi-pencil"
                    @click="showEditBasicInfo"
                    v-if="!isSuperAdmin"
                  />

                  <Dialog v-model:visible="editBasicInfo" class="w-4/5" modal>
                    <step-one v-model="store.detailChallenge.information">
                      <template #action="{ data }">
                        <div class="flex justify-between items-center">
                          <Button
                            label="Cancel"
                            severity="secondary"
                            @click="onCancelBasicInfo"
                          ></Button>
                          <Button
                            label="Save"
                            severity="warning"
                            @click="onUpdateBasicInfo(data)"
                          ></Button>
                        </div>
                      </template>
                    </step-one>
                  </Dialog>
                </div>
                <div class="flex justify-between items-center">
                  <h1 class="text-xl font-bold p-text-primary">
                    {{ store.detailChallenge.information.name }}
                  </h1>
                </div>
                <div class="flex justify-start items-center space-x-2">
                  <i class="pi pi-clock"></i>
                  <p>
                    Start at:
                    {{ new Date(store.detailChallenge.information.start_at).toDateString() }}
                  </p>
                  <i class="pi pi-arrow-right"></i>
                  <p>
                    Finish at:
                    {{ new Date(store.detailChallenge.information.finish_at).toDateString() }}
                  </p>
                </div>

                <div class="flex space-x-4">
                  <div
                    class="border rounded-md px-4 h-10 flex justify-center items-center border-blue-600 text-blue-600"
                  >
                    <p class="font-semibold mr-2">Level:</p>
                    <p class="font-semibold">Easy</p>
                  </div>
                  <div
                    class="border rounded-md px-4 h-10 flex justify-center items-center border-blue-600 text-blue-600"
                  >
                    <p class="font-semibold mr-2">Max Members:</p>
                    <p class="font-semibold">{{ store.detailChallenge.information.max_members }}</p>
                  </div>
                  <div
                    class="border rounded-md px-4 h-10 flex justify-center items-center border-blue-600 text-blue-600"
                  >
                    <p class="font-semibold mr-2">Status:</p>
                    <p class="font-semibold">{{ store.detailChallenge.information.status }}</p>
                  </div>
                </div>
                <div>
                  <p>
                    {{ store.detailChallenge.information.description }}
                  </p>
                </div>
                <div class="grid grid-cols-3 grid-flow-row gap-4">
                  <img
                    v-for="img in store.detailChallenge.information.images"
                    :src="img.url"
                    alt="challenge image"
                    srcset=""
                    :key="img.path"
                    class="object-cover h-40 w-full"
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <template #header>
                <i class="pi pi-th-large"></i>
                <p class="ml-2">Template Plan</p>
              </template>
              <div class="flex gap-4 justify-end mb-4" v-if="editTemplate">
                <Button label="Cancel" severity="secondary" @click="editTemplate = false" />
                <Button label="Save" severity="warning" />
              </div>
              <template v-for="(phase, index) in store.detailChallenge.template" :key="phase.id">
                <Panel header="Beginner (7 days)" :toggleable="index > 0">
                  <template #header>
                    <Inplace :closable="true">
                      <template #display>
                        {{
                          phase.name
                            ? `${phase.name} (${phase.total_days} days)`
                            : `Phase ${index + 1} (${phase.total_days} days)`
                        }}
                      </template>
                      <template #content>
                        <InputText v-model="phase.name" />
                      </template>
                    </Inplace>
                  </template>
                  <template #icons>
                    <Button
                      icon="pi pi-pencil"
                      label="Edit"
                      severity="warning"
                      text
                      rounded
                      aria-label="total-days"
                      size="small"
                      v-if="editTemplate === false && !isSuperAdmin"
                      @click="editTemplate = true"
                    />
                    <template v-if="editTemplate">
                      <Button
                        icon="pi pi-calendar-plus"
                        v-tooltip.top="'edit total days'"
                        text
                        rounded
                        aria-label="total-days"
                        size="small"
                        @click="(event) => toggleTotalDays(event, index)"
                      />
                      <OverlayPanel ref="totalDaysPopup">
                        <div class="p-inputgroup flex-1 mb-4">
                          <InputNumber
                            inputId="total-days"
                            :min="1"
                            :max="30"
                            placeholder="add total days"
                            :model-value="phase.total_days"
                            @update:model-value="($event) => onUpdateSessions($event, phase)"
                          />
                          <span class="p-inputgroup-addon">days</span>
                        </div>
                      </OverlayPanel>
                      <Button
                        icon="pi pi-file-edit"
                        v-tooltip.top="'add note or description'"
                        text
                        rounded
                        aria-label="note"
                        size="small"
                      />
                      <Button
                        icon="pi pi-eraser"
                        v-tooltip.top="'clear all sessions'"
                        severity="warning"
                        text
                        rounded
                        aria-label="clear"
                        size="small"
                        @click="onClearSession(phase)"
                      />
                      <Button
                        icon="pi pi-trash"
                        v-tooltip.top="'delete this phase'"
                        severity="danger"
                        text
                        rounded
                        aria-label="delete"
                        size="small"
                        @click="remove(index)"
                      />
                    </template>
                  </template>
                  <div class="flex flex-wrap gap-4 justify-evenly">
                    <session-component
                      :session-name="index + 1"
                      v-model:description="phase.sessions[index].descriptions"
                      v-model:exercises="phase.sessions[index].exercises"
                      v-for="(session, index) in phase.sessions"
                      :key="index"
                      :edit="editTemplate"
                    />
                  </div>
                </Panel>
              </template>
            </TabPanel>
            <TabPanel>
              <template #header>
                <i class="pi pi-users"></i>
                <p class="ml-2">Members</p>
              </template>
              <div></div>
            </TabPanel>
          </TabView>
        </div>
      </div>
      <div class="card w-2/5 space-y-6 min-h-full" v-if="!isSuperAdmin">
        <TabView>
          <TabPanel header="Feedback">
            <p></p>
          </TabPanel>
          <TabPanel header="Result Workout">
            <p></p>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </base-view>
</template>
