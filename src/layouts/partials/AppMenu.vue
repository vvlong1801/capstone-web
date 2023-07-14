<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import { appMenu } from '@/configs/menu.js';
const menu = ref(appMenu);
</script>
<template>
  <ul class="layout-menu pt-6 pl-2">
    <template v-for="(item, i) in menu" :key="item">
      <app-menu-item :item="item" :index="i"></app-menu-item>
    </template>
  </ul>
</template>
