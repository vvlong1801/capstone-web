<script setup>
import AppTopbar from './partials/AppTopbar.vue';
import AppSidebar from './partials/AppSidebar.vue';
import { RouterView } from 'vue-router';
import { useStorage } from '@vueuse/core';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth/auth';
const showSideBar = useStorage('showSideBar', true);
const newChallengeId = ref();

const toast = useToast();
const authStore = useAuthStore();
console.log(authStore.userInfo.id);

window.Echo.private(`App.Models.User.${authStore.userInfo.id}`).notification((notification) => {
  console.log(notification);
  toast.add({
    severity: 'info',
    summary: notification.challenge_name,
    detail: notification.message,
    group: 'notify'
  });
});
if (authStore.isSuperAdmin) {
  window.Echo.private('new-challenge').listen('NewChallengeEvent', async (e) => {
    console.log(`${e.createdBy} created the challenge ${e.name}`);
    newChallengeId.value = e.id;
    await toast.add({
      severity: 'info',
      summary: 'You have a new challenge',
      detail: `${e.createdBy} created the challenge ${e.name}`,
      group: 'new-challenge'
    });
  });
}

// const onClickNewChallengeNotify = () => {};
</script>
<template>
  <div class="layout-wrapper">
    <app-topbar v-model:showSideBar="showSideBar" />
    <div class="layout-sidebar" v-if="showSideBar">
      <app-sidebar />
    </div>
    <div class="layout-main-container transition-all" :class="{ 'ml-80 pl-16': showSideBar }">
      <div class="relative w-full">
        <Toast
          group="new-challenge"
          @click="$router.push({ name: 'challenges.show', params: { id: newChallengeId } })"
        />
        <Toast group="notify" />
        <router-view></router-view>
      </div>
      <!-- <app-footer></app-footer> -->
    </div>
    <!-- <app-config></app-config> -->
    <!-- <div class="hidden"></div> -->
  </div>
</template>
