<script setup>
import { defineProps, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth';

const route = useRoute();
const authStore = useAuthStore();

defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number,
    default: 0
  },
  root: {
    type: Boolean,
    default: true
  }
  // parentItemKey: {
  //   type: String,
  //   default: null,
  // },
});

const checkActiveItem = (item) => {
  return route.path.includes(item.to);
};

const role = ref(authStore.userInfo.role);
</script>
<template>
  <li>
    <div
      v-if="root && item.visible !== false && item.role?.includes(role)"
      class="app-menu_item-root_text text-slate-500"
    >
      {{ item.label }}
    </div>
    <router-link
      v-if="item.to && !item.items && item.visible !== false"
      tabindex="0"
      :to="item.to"
      class="app-menu_item-item"
      :class="{ 'menu_item-active': checkActiveItem(item) }"
    >
      <i :class="item.icon" class="!text-xl"></i>
      <span class="!text-lg font-medium">{{ item.label }}</span>
      <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
    </router-link>
    <Transition v-if="item.items" name="layout-submenu">
      <ul class="layout-submenu">
        <template v-for="(child, i) in item.items" :key="child">
          <app-menu-item
            :index="i"
            :item="child"
            :root="false"
            v-if="child.role?.includes(role)"
          ></app-menu-item>
        </template>
      </ul>
    </Transition>
  </li>
</template>
