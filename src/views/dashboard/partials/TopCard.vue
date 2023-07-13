<script setup>
import Rating from 'primevue/rating';
import { ref } from 'vue';
import DefaultImage from '@/assets/images/banner.jpg';

defineProps(['image', 'title', 'members_count']);
const rate = ref(4.5);
</script>
<template>
  <div class="card !p-4 flex gap-4">
    <img :src="image?.url ?? DefaultImage" alt="" class="w-20 h-20 object-cover" />
    <div class="flex flex-col gap-2 font-medium">
      <h1>{{ title }}</h1>
      <slot>
        <Rating v-model="rate" readonly :cancel="false" class="!text-yellow-500" />
        <div class="flex space-x-2 text-lg justify-start items-center">
          <i class="pi pi-users" style="font-size: 1.25rem; font-weight: 500" />
          <span>{{ members_count }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>
