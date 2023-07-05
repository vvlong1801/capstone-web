<!-- eslint-disable vue/valid-v-on -->
<script setup>
import Avatar from 'primevue/avatar';
import Sidebar from 'primevue/sidebar';
import AutoComplete from 'primevue/autocomplete';

import { defineProps, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth';

defineProps(['showSideBar']);
const visibleRightSideBar = ref(false);
const authStore = useAuthStore();

const globalSearchValue = ref('');
const suggestionItems = ref([]);

const search = (event) => {
  suggestionItems.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
};
</script>
<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <span>CHALLENGE ME</span>
    </router-link>

    <button
      class="text-left layout-topbar-button"
      @click="$emit('update:showSideBar', !showSideBar)"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button class="hidden layout-topbar-button">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="ml-auto p-0 flex items-center">
      <AutoComplete
        v-model="globalSearchValue"
        :suggestions="suggestionItems"
        @complete="search"
        class="mr-3 min-w-[300px]"
        input-class="w-full"
        placeholder="Enter search ..."
      />

      <Avatar
        :label="authStore.userInfo.name[0]"
        image="/assets/images/banner.jpg"
        class="mr-2 !bg-orange-500 cursor-pointer"
        shape="circle"
        size="large"
        @click="visibleRightSideBar = true"
      />
      <Sidebar v-model:visible="visibleRightSideBar" position="right" class="min-w-fit">
        <h2 class="font-bold">Welcome</h2>
        <h5 class="font-medium text-slate-500 mb-9">{{ authStore.userInfo.name }}</h5>
        <ul class="list-none m-0 p-0 w-full space-y-3">
          <li class="p-3 border border-slate-300 rounded-md">
            <router-link to="/" class="flex items-center">
              <span><i class="pi pi-user text-xl text-primary-500"></i></span>
              <div class="ml-3">
                <span class="mb-2 font-semibold">Profile</span>
                <p class="text-color-secondary">Lorem ipsum date visale</p>
              </div>
            </router-link>
          </li>
          <li class="p-3 border border-slate-300 rounded-md">
            <router-link to="/" class="flex items-center">
              <span><i class="pi pi-cog text-xl text-primary-500"></i></span>
              <div class="ml-3">
                <span class="mb-2 font-semibold">Settings</span>
                <p class="text-color-secondary">Lorem ipsum date visale</p>
              </div>
            </router-link>
          </li>
          <li class="p-3 border border-slate-300 rounded-md">
            <div class="flex items-center cursor-pointer" @click="authStore.logout">
              <span><i class="pi pi-power-off text-xl text-primary-500"></i></span>
              <div class="ml-3">
                <span class="mb-2 font-semibold">Sign Out</span>
                <p class="text-color-secondary">Lorem ipsum date visale</p>
              </div>
            </div>
          </li>
        </ul>
        <h2 class="font-bold mt-9">Notifications</h2>
        <h5 class="font-medium text-slate-500 mb-9">You have 3 notifications</h5>
        <ul class="list-none m-0 p-0 w-full space-y-3">
          <li class="p-3 border border-slate-300 rounded-md">
            <router-link to="/" class="flex items-center">
              <span><i class="pi pi-file-edit text-xl text-primary-500"></i></span>
              <div class="ml-3">
                <span class="mb-2 font-semibold">Creator A created new challenge</span>
                <p class="font-sans">4 min ago</p>
              </div>
            </router-link>
          </li>
          <li class="p-3 border border-slate-300 rounded-md">
            <router-link to="/" class="flex items-center">
              <span><i class="pi pi-file-edit text-xl text-primary-500"></i></span>
              <div class="ml-3">
                <span class="mb-2 font-semibold">Creator A created new challenge</span>
                <p class="font-sans">4 min ago</p>
              </div>
            </router-link>
          </li>
          <li class="p-3 border border-slate-300 rounded-md">
            <router-link to="/" class="flex items-center">
              <span><i class="pi pi-file-edit text-xl text-primary-500"></i></span>
              <div class="ml-3">
                <span class="mb-2 font-semibold">Creator A created new challenge</span>
                <p class="font-sans">4 min ago</p>
              </div>
            </router-link>
          </li>
        </ul>
      </Sidebar>
    </div>
  </div>
</template>
