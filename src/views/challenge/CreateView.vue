<script setup>
import BaseView from '../BaseView.vue';
import Steps from 'primevue/steps';
import { ref } from 'vue';

const items = ref([
  {
    label: 'Information',
    to: '/challenges/create/step-one'
  },
  {
    label: 'Template',
    to: '/challenges/create/step-two'
  },
  {
    label: 'Invitation',
    to: '/challenges/create/step-three'
  }
]);
</script>
<template>
  <base-view title="Create Challenge">
    <div class="card">
      <Steps :model="items" aria-label="Form Steps"/>
    </div>
    <div class="card mt-8">
      <router-view></router-view>
    </div>
  </base-view>
</template>
