<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import BaseView from '../BaseView.vue';
import TemplatePanel from './partials/TemplatePanel.vue';
import MemberPanel from './partials/MemberPanel.vue';
import InvitationPanel from './partials/InvitationPanel.vue';
import Badge from 'primevue/badge';
import BasicInfoPanel from './partials/BasicInfoPanel.vue';

import Dialog from 'primevue/dialog';
import StepOne from './forms/StepOne.vue';
import FeedbackBox from './partials/detail/FeedbackBox.vue';
import CommentBox from './partials/detail/CommentBox.vue';

import { useConfirm } from 'primevue/useconfirm';

import { onMounted, ref, computed } from 'vue';
import { useChallengeStore } from '@/stores/challenge';
import { useAuthStore } from '@/stores/auth/auth';
import { useRoute } from 'vue-router';
import { useStorage } from '@vueuse/core';

const showSideBar = useStorage('showSideBar', true);
const route = useRoute();
const store = useChallengeStore();
const confirm = useConfirm();

const { isSuperAdmin, userInfo } = useAuthStore();

const editTemplate = ref(false);
const reasonsUnApprove = ref('');

const id = route.params.id;

const feedbackNonReply = computed(() => {
  let nonReplies = store.feedbacks.filter((item) => item.replies.length == 0);
  return nonReplies.length;
});
onMounted(async () => {
  await store.getChallengeById(id);
  console.log(store.detailChallenge);
});

const editBasicInfo = ref(false);

const onShowEditDialog = () => {
  store.form = JSON.parse(JSON.stringify(store.detailChallenge.information));
  editBasicInfo.value = true;
};

const onCancelBasicInfo = () => {
  editBasicInfo.value = false;
  store.form = {};
};

const onUpdateBasicInfo = async (data) => {
  console.log(data);
  await store.updateBasicInfo(id, data);
  await store.getChallengeById(id);
  editBasicInfo.value = false;
  store.form = {};
};

const onApprove = () => {
  confirm.require({
    message: 'Are you sure you want to appove this challenge',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      await store.confirmChallenge(id, { approve: true });
      await store.getChallengeById(id);
    },
    reject: () => {}
  });
};

const onUnApprove = () => {
  confirm.require({
    group: 'unApprove',
    header: 'UnApprove',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      await store.confirmChallenge(id, { approve: false, reasons: reasonsUnApprove.value });
      await store.getChallengeById(id);
    },
    reject: () => {}
  });
};

const onUpdateTemplate = () => {};
const onUpdateInvitation = async (data) => {
  await store.updateInvitation(id, data);
  await store.getChallengeById(id);
};

const onShowMessage = () => {
  showSideBar.value = false;
};

const onHiddenMessage = () => {
  showSideBar.value = true;
};

const hasEditPermission = () => {
  return (
    store.detailChallenge?.information?.created_by?.id === userInfo.id &&
    store.detailChallenge.information.status == 'active'
  );
};
</script>
<template>
  <base-view title="Detail Challenge">
    <template #action-header>
      <Button label="Show Message Box" @click="onShowMessage" v-if="showSideBar" />
      <Button
        label="Hidden Message Box"
        @click="onHiddenMessage"
        v-if="!showSideBar"
      />
    </template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <ConfirmDialog group="unApprove">
      <template #message>
        <span class="p-float-label !w-[500px]">
          <Textarea v-model="reasonsUnApprove" autoResize rows="5" class="w-full" />
          <label>Reasons</label>
        </span>
      </template>
    </ConfirmDialog>
    <Dialog v-model:visible="editBasicInfo" class="w-4/5" modal>
      <step-one v-model="store.detailChallenge.information">
        <template #action="{ data }">
          <div class="flex justify-between items-center">
            <Button label="Cancel" severity="secondary" @click="onCancelBasicInfo"></Button>
            <Button label="Save" severity="warning" @click="onUpdateBasicInfo(data)"></Button>
          </div>
        </template>
      </step-one>
    </Dialog>
    <div class="flex space-x-6">
      <div class="grow space-y-6 min-h-full">
        <div class="flex space-x-6" v-if="!isSuperAdmin">
          <div class="card flex-1 min-h-[100px] text-center text-lg font-medium">
            <p class="text-slate-500">Members</p>
            <p class="font-bold text-2xl">{{ store.detailChallenge?.members?.length }}</p>
          </div>
          <div class="card flex-1 text-center text-lg font-medium">
            <p class="text-slate-500">Workout hours</p>
            <p class="font-bold text-2xl">0</p>
          </div>
          <div class="card flex-1 text-center text-lg font-medium">
            <p class="text-slate-500">Comments</p>
            <p class="font-bold text-2xl">
              {{ store.detailChallenge.information?.comments?.length }}
            </p>
          </div>
        </div>
        <div class="card w-full min-h-[800px]">
          <TabView :activeIndex="0">
            <TabPanel>
              <template #header>
                <i class="pi pi-info-circle"></i>
                <p class="ml-1">Basic Information</p>
              </template>
              <basic-info-panel
                :information="store.detailChallenge.information"
                :show-edit-button="hasEditPermission()"
                @approve="onApprove"
                @un-approve="onUnApprove"
                @show-edit-dialog="onShowEditDialog"
              ></basic-info-panel>
            </TabPanel>
            <TabPanel>
              <template #header>
                <i class="pi pi-th-large"></i>
                <p class="ml-1">Template Plan</p>
              </template>
              <div class="flex gap-4 justify-end mb-4" v-if="editTemplate">
                <Button label="Cancel" severity="secondary" @click="editTemplate = false" />
                <Button label="Save" severity="warning" @click="onUpdateTemplate" />
              </div>
              <TemplatePanel
                :show-edit-button="false"
                v-model:edit-mode="editTemplate"
                :template="store.detailChallenge.template"
              ></TemplatePanel>
            </TabPanel>
            <TabPanel>
              <template #header>
                <i class="pi pi-users"></i>
                <p class="ml-1">Members</p>
              </template>
              <member-panel :members="store.detailChallenge.members"></member-panel>
            </TabPanel>
            <TabPanel>
              <template #header>
                <i class="pi pi-users"></i>
                <p class="ml-1">Invitations</p>
              </template>
              <invitation-panel
                :invitations="store.detailChallenge.invitation"
                :members="store.detailChallenge.members"
                :accept-all="store.detailChallenge.information.acceptAll"
                @update="onUpdateInvitation"
                :can-add-invite="hasEditPermission()"
              ></invitation-panel>
            </TabPanel>
          </TabView>
        </div>
      </div>
      <div
        class="card space-y-6 custom-height"
        v-if="!showSideBar"
        :class="{ 'w-1/4': !showSideBar }"
      >
        <TabView>
          <TabPanel>
            <template #header>
              <div class="mr-2">Feedback</div>
              <Badge :value="feedbackNonReply" severity="warning" v-if="feedbackNonReply"></Badge>
            </template>
            <feedback-box></feedback-box>
          </TabPanel>
          <TabPanel>
            <template #header>
              <div class="mr-2">Comment</div>
              <Badge
                :value="store.comments.length"
                severity="warning"
                v-if="store.comments.length > 0"
              ></Badge>
            </template>
            <comment-box></comment-box>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </base-view>
</template>
<style scoped>
.custom-height {
  height: calc(100vh - 160px);
}
</style>
