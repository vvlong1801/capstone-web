<script setup>
import BaseView from '@/views/BaseView.vue';
import { useAuthStore } from '@/stores/auth/auth';
import CreatorDashboard from './CreatorDashboard.vue';
import AdminDashboard from './AdminDashboard.vue';

const authStore = useAuthStore();
</script>

<template>
  <base-view title="Dashboard">
    <component :is="authStore.userInfo.role == 'creator' ? CreatorDashboard : AdminDashboard">
    </component>
  </base-view>
</template>
