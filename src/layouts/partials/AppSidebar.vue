<script setup>
import AppMenu from './AppMenu.vue';
import Avatar from 'primevue/avatar';
import Rating from 'primevue/rating';
import { useAuthStore } from '@/stores/auth/auth';
const authStore = useAuthStore();
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
      <div class="font-bold mb-2 flex items-center">
        {{ authStore.userInfo?.name }}
        <i class="pi pi-verified text-green-500 ml-2" v-if="authStore.creatorInfo?.is_PT" />
      </div>
      <Rating
        v-model="authStore.creatorInfo.rate"
        :cancel="false"
        readonly
        v-if="authStore.creatorInfo?.is_PT"
      />
    </div>
  </div>
  <app-menu></app-menu>
</template>
