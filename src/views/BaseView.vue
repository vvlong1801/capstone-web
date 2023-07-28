<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  title: {
    type: String,
    required: false
  }
});
</script>
<template>
  <div class="flex flex-col gap-6 w-full">
    <div class="page-header flex justify-between items-center">
      <h4 v-if="props.title" class="text-2xl font-semibold">
        {{ props.title }}
      </h4>
      <slot name="action-header"></slot>
    </div>

    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>
