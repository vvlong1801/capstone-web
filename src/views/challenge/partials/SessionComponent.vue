<script setup>
import { defineProps, ref } from 'vue';
import SessionDialog from './SessionDialog.vue';
defineProps(['day']);

const openDialog = ref(false);
</script>
<template>
  <div class="flex-col space-y-2">
    <session-dialog v-model:visible="openDialog"></session-dialog>
    <div
      class="border rounded-t-md p-2 text-center font-semibold text-white bg-indigo-500 relative"
    >
      {{ `Day ${day}` }}
      <Button
        icon="pi pi-pencil"
        text
        size="small"
        rounded
        aria-label="dit"
        class="!absolute !top-1/2 !right-2 !w-8 !h-8 -translate-y-1/2 !text-white"
        @click="openDialog = true"
      />
    </div>
    <div class="border flex p-2 space-x-2">
      <img src="@/assets/images/banner.jpg" alt="" class="w-12 h-12 object-cover" />
      <div>
        <h5 class="font-medium p-text-primary">Exercise A</h5>
        <span class="p-text-secondary mr-2">set: 3</span>
        <span class="p-text-secondary">rep: 10</span>
      </div>
    </div>
    <div class="border flex p-2 space-x-2">
      <img src="@/assets/images/banner.jpg" alt="" class="w-12 h-12 object-cover" />
      <div>
        <h5 class="font-medium p-text-primary">Exercise A</h5>
        <span class="p-text-secondary mr-2">set: 3</span>
        <span class="p-text-secondary">rep: 10</span>
      </div>
    </div>
    <div class="border flex p-2 space-x-2">
      <img src="@/assets/images/banner.jpg" alt="" class="w-12 h-12 object-cover" />
      <div>
        <h5 class="font-medium p-text-primary">Exercise A</h5>
        <span class="p-text-secondary mr-2">set: 3</span>
        <span class="p-text-secondary">rep: 10</span>
      </div>
    </div>
  </div>
</template>
