<script setup>
import AppMenu from './AppMenu.vue';
import Avatar from 'primevue/avatar';
import Rating from 'primevue/rating';
import { useAuthStore } from '@/stores/auth/auth';
import { ref } from 'vue';
const authStore = useAuthStore();
const rate = ref(4);
</script>
<template>
  <div class="flex pl-2 pt-6 min-h-fit" v-if="authStore.userInfo.role == 'creator'">
    <Avatar
      :image="authStore.userInfo?.avatar?.url"
      class="!bg-orange-500 cursor-pointer !h-20 !w-20 !text-3xl"
      shape="square"
      v-if="authStore.userInfo.avatar"
    />
    <Avatar
      v-else
      :label="authStore.userInfo?.name[0]"
      class="!bg-orange-500 cursor-pointer !h-20 !w-20 !text-3xl"
      shape="square"
    />
    <div class="pl-4">
      <span class="font-medium text-slate-500">Welcome</span>
      <p class="font-bold mb-2">{{ authStore.userInfo?.name }}</p>
      <Rating v-model="rate" :cancel="false" readonly />
    </div>
  </div>
  <app-menu></app-menu>
</template>
