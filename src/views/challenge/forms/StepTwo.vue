<script setup>
import SessionComponent from '../partials/SessionComponent.vue';
import Panel from 'primevue/panel';
import Inplace from 'primevue/inplace';
import OverlayPanel from 'primevue/overlaypanel';
import InputNumber from 'primevue/inputnumber';

import { ref, reactive, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useChallengeStore } from '@/stores/challenge';

const router = useRouter();

const stepTwoData = reactive({
  phases: [
    {
      name: '',
      total_days: 1,
      sessions: [
        {
          descriptions: '',
          exercises: []
        }
      ]
    }
  ]
});
const store = useChallengeStore();

onMounted(() => {
  if (store.form.template) {
    Object.assign(stepTwoData, store.form.template);
  }
});

watch(stepTwoData, (newValue) => {
  store.form.template = newValue;
});

const totalDaysPopup = ref();

const toggleTotalDays = (event, index) => {
  totalDaysPopup.value[index].toggle(event);
};
const onCreatePhase = () =>
  stepTwoData.phases.push({
    name: '',
    total_days: 1,
    sessions: [
      {
        descriptions: '',
        exercises: []
      }
    ]
  });
const onUpdateSessions = (newTotalDay, phase) => {
  let numNewPhase = newTotalDay - phase.sessions.length;
  if (numNewPhase > 0) {
    let newPhase = Array.from({ length: numNewPhase }, () =>
      reactive({
        descriptions: '',
        exercises: []
      })
    );
    phase.sessions = [...phase.sessions, ...newPhase];
  }
  if (numNewPhase < 0) {
    console.log(phase.sessions);
    phase.sessions = phase.sessions.slice(0, newTotalDay);
  }
  phase.total_days = newTotalDay;
};
const onClearSession = (phase) => ((phase.sessions = []), (phase.total_days = 0));

const onNext = () => {
  console.log('next');
  router.push({ name: 'challenges.create.step_three' });
};
</script>
<template>
  <div class="flex flex-col gap-8">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-semibold">Create Template</h1>
        <h3 class="text-sm p-text-secondary">Enter basic information & permission</h3>
      </div>
      <Button label="New Phase" icon="pi pi-plus" size="small" @click="onCreatePhase" />
    </div>
    <div class="space-y-8 w-full">
      <template v-for="(phase, index) in stepTwoData.phases" :key="phase.key">
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
          <div class="flex flex-wrap gap-4 justify-evenly">
            <session-component
              :session-name="index + 1"
              v-model:description="phase.sessions[index].descriptions"
              v-model:exercises="phase.sessions[index].exercises"
              :edit="true"
              v-for="(session, index) in phase.sessions"
              :key="index"
            />
          </div>
        </Panel>
      </template>
    </div>
    <div class="flex justify-between">
      <Button
        label="Back"
        icon="pi pi-arrow-left"
        severity="secondary"
        @click="$router.push({ name: 'challenges.create.step_one' })"
      />
      <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="onNext" />
    </div>
  </div>
</template>
