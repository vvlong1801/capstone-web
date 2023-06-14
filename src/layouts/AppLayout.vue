<script setup>
import AppTopbar from './partials/AppTopbar.vue';
import AppSidebar from './partials/AppSidebar.vue';
import { RouterView } from 'vue-router';
import { useStorage } from '@vueuse/core';

const showSideBar = useStorage('showSideBar', true);
</script>
<template>
  <div class="layout-wrapper">
    <app-topbar v-model:showSideBar="showSideBar" />
    <div class="layout-sidebar" v-if="showSideBar">
      <app-sidebar />
    </div>
    <div class="layout-main-container transition-all" :class="{ 'ml-80 pl-16': showSideBar }">
      <div class="relative w-full">
        <router-view></router-view>
      </div>
      <!-- <app-footer></app-footer> -->
    </div>
    <!-- <app-config></app-config> -->
    <!-- <div class="hidden"></div> -->
  </div>
</template>
