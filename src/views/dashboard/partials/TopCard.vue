<script setup>
import Rating from 'primevue/rating';
</script>
<template>
  <div class="card !p-4 flex gap-4">
    <img src="@/assets/images/banner.jpg" alt="" class="w-20 h-20 object-cover" />
    <div class="flex flex-col gap-2 font-medium">
      <h1>Challenge A</h1>
      <Rating v-model="rate" readonly :cancel="false" class="!text-yellow-500" />
      <div class="flex space-x-2 text-lg justify-start items-center">
        <i class="pi pi-users" style="font-size: 1.25rem; font-weight: 500" />
        <span>0</span>
      </div>
    </div>
  </div>
</template>
