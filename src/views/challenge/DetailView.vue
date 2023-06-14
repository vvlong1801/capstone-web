<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import BaseView from '../BaseView.vue';
import SessionComponent from './partials/SessionComponent.vue';
// import Accordion from 'primevue/accordion';
// import AccordionTab from 'primevue/accordiontab';
import Panel from 'primevue/panel';
import Menu from 'primevue/menu';
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
          <TabView class="tabview-custom" :activeIndex="1">
            <TabPanel>
              <template #header>
                <i class="pi pi-info-circle"></i>
                <p class="ml-2">Basic Information</p>
              </template>
              <div class="space-y-4">
                <div class="flex justify-between items-center space-x-6">
                  <div class="flex space-x-2 items-center">
                    <i class="pi pi-tags" style="font-size: 1.25rem"></i>
                    <Chip label="cardio" class="!text-sm"></Chip>
                    <Chip label="7 days" class="!text-sm"></Chip>
                    <Chip label="running" class="!text-sm"></Chip>
                  </div>
                  <Button label="Edit" severity="warning" text icon="pi pi-file-edit" />
                </div>
                <div class="flex justify-between items-center">
                  <h1 class="text-xl font-bold p-text-primary">Challenge A</h1>
                </div>
                <div class="flex justify-start items-center space-x-2">
                  <i class="pi pi-clock"></i>
                  <p>Start at: 01/01/2023</p>
                  <i class="pi pi-arrow-right"></i>
                  <p>Finish at: 01/01/2023</p>
                </div>
                <div>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                    veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                    voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    Consectetur, adipisci velit, sed quia non numquam eius modi.
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
                    <p class="font-semibold">100</p>
                  </div>
                  <div
                    class="border rounded-md px-4 h-10 flex justify-center items-center border-blue-600 text-blue-600"
                  >
                    <p class="font-semibold mr-2">Status:</p>
                    <p class="font-semibold">Public</p>
                  </div>
                </div>
                <div>
                  <img src="@/assets/images/banner.jpg" alt="" srcset="" />
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <template #header>
                <i class="pi pi-th-large"></i>
                <p class="ml-2">Template Plan</p>
              </template>

              <Panel header="Beginner (7 days)" toggleable>
                <template #icons>
                  <button class="p-panel-header-icon p-link mr-2" @click="toggle">
                    <span class="pi pi-cog"></span>
                  </button>
                  <Menu ref="menu" id="config_menu" :model="items" popup />
                </template>
                <div class="grid 2xl:grid-cols-3 md:grid-cols-2 gap-4">
                  <session-component v-for="(item) in 7" :day="item" :key="item"></session-component>
                </div>
              </Panel>
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
