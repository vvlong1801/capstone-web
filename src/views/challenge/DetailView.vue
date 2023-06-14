<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import BaseView from '../BaseView.vue';
import SessionComponent from './partials/SessionComponent.vue';
// import Accordion from 'primevue/accordion';
// import AccordionTab from 'primevue/accordiontab';
import Panel from 'primevue/panel';
import Menu from 'primevue/menu';

import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useChallengeStore } from '@/stores/challenge';

const route = useRoute();
const store = useChallengeStore();

onMounted(async () => {
  let id = route.params.id;
  await store.getChallengeById(id);
  console.log(store.detailChallenge);
});
</script>
<template>
  <base-view title="Detail Challenge">
    <div class="flex space-x-6">
      <div class="w-full space-y-6 min-h-full">
        <div class="flex space-x-6">
          <div class="card flex-1 min-h-[100px] flex space-x-4"></div>
          <div class="card flex-1">member</div>
          <div class="card flex-1">hour</div>
          <div class="card flex-1">report</div>
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
                      v-for="tag in store.detailChallenge.tags"
                      :key="tag.id"
                    ></Chip>
                  </div>
                  <Button label="Edit" severity="warning" text icon="pi pi-file-edit" />
                </div>
                <div class="flex justify-between items-center">
                  <h1 class="text-xl font-bold p-text-primary">{{ store.detailChallenge.name }}</h1>
                </div>
                <div class="flex justify-start items-center space-x-2">
                  <i class="pi pi-clock"></i>
                  <p>Start at: {{ new Date(store.detailChallenge.start_at).toDateString() }}</p>
                  <i class="pi pi-arrow-right"></i>
                  <p>Finish at: {{ new Date(store.detailChallenge.finish_at).toDateString() }}</p>
                </div>
                <div>
                  <p>
                    {{ store.detailChallenge.description }}
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
                    <p class="font-semibold">{{ store.detailChallenge.max_members }}</p>
                  </div>
                  <div
                    class="border rounded-md px-4 h-10 flex justify-center items-center border-blue-600 text-blue-600"
                  >
                    <p class="font-semibold mr-2">Status:</p>
                    <p class="font-semibold">{{ store.detailChallenge.status }}</p>
                  </div>
                </div>
                <div>
                  <img :src="store.detailChallenge.image?.url" alt="challenge image" srcset="" />
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <template #header>
                <i class="pi pi-th-large"></i>
                <p class="ml-2">Template Plan</p>
              </template>

              <template v-for="(phase, index) in store.detailChallenge.phases" :key="phase.id">
                <Panel header="Beginner (7 days)" :toggleable="index > 0">
                  <!-- <template #header>
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
                  </template> -->
                  <!-- <template #icons>
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
                  </template> -->
                  <div class="flex flex-wrap gap-4 justify-evenly">
                    <session-component
                      :session-name="index + 1"
                      v-model:description="phase.sessions[index].descriptions"
                      v-model:exercises="phase.sessions[index].exercises"
                      v-for="(session, index) in phase.sessions"
                      :key="index"
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
      <div class="card w-2/5 space-y-6 min-h-full">
        <TabView>
          <TabPanel header="Comment">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </TabPanel>
          <TabPanel header="Member Result">
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
              modi.
            </p>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </base-view>
</template>
