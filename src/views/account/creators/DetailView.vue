<script setup>
import BaseView from '@/views/BaseView.vue';
import Rating from 'primevue/rating';
import { ref } from 'vue';
const rate = ref(4);
</script>
<template>
  <base-view title="Detail Creator">
    <div class="card flex gap-8">
      <Image
        src="https://primefaces.org/cdn/primevue/images/galleria/galleria7.jpg"
        alt="Image"
        class="w-1/3"
      />
      <div class="w-full">
        <div class="flex justify-between w-full items-center">
          <h1 class="text-4xl font-semibold text-slate-800 font-sans">Creator ABC</h1>
          <Button label="Block" severity="danger" outlined />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-yellow-700">Personal Trainer</h3>
        </div>
        <!-- <span class="text-lg font-semibold text-slate-500">Rankings</span> -->
        <div class="flex mb-8">
          <span class="text-2xl font-semibold mr-2">4.5</span>
          <Rating v-model="rate" :cancel="false" readonly />
        </div>
        <div class="space-y-2">
          <div class="flex">
            <i class="pi pi-phone !text-xl font-semibold text-slate-700" />
            <span class="text-xl font-medium ml-2">0987654321</span>
          </div>
          <div class="flex">
            <i class="pi pi-facebook !text-xl font-semibold text-slate-700" />
            <span class="text-xl font-medium ml-2">0987654321</span>
          </div>
          <div class="flex">
            <i class="pi pi-youtube !text-xl font-semibold text-slate-700" />
            <span class="text-xl font-medium ml-2">0987654321</span>
          </div>
        </div>
      </div>
    </div>
  </base-view>
</template>
