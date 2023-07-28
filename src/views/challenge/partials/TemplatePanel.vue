<script setup>
import SessionComponent from './SessionComponent.vue';
import InputNumber from 'primevue/inputnumber';
import Panel from 'primevue/panel';
import Inplace from 'primevue/inplace';
import OverlayPanel from 'primevue/overlaypanel';
// import { useChallengeStore } from '@/stores/challenge';
import { onMounted, reactive } from 'vue';

// const store = useChallengeStore();
const props = defineProps(['editMode', 'template', 'showEditButton']);
const templateData = reactive({
  phases: []
});
// Object.assign(templateData, store.form.template);
onMounted(() => {
  Object.assign(templateData.phases, props.template);
});
// watch(templateData, (newValue) => {
//   store.form.template = newValue;
// });
</script>
<template>
  <template v-for="(phase, index) in template" :key="phase.id">
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
          v-if="editMode === false && showEditButton"
          @click="$emit('update:editMode', true)"
        />
        <template v-if="editMode">
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
          :edit="editMode"
        />
      </div>
    </Panel>
  </template>
</template>
