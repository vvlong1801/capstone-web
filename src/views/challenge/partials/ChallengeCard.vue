<script setup>
import Rating from 'primevue/rating';
import { ref } from 'vue';
const rate = ref(4);
</script>
<template>
  <div class="relative h-fit border p-outline-primary rounded-md min-h-[500px] overflow-hidden">
    <img
      src="@/assets/images/banner.jpg"
      alt="banner"
      srcset=""
      class="w-full h-[200px] object-cover"
    />
    <div class="p-4 space-y-2">
      <div class="flex space-x-4 justify-start items-center">
        <h1 class="text-xl font-bold p-text-primary">Challenge A</h1>
        <i class="pi pi-lock !text-red-600"></i>
      </div>

      <div class="flex justify-between">
        <div class="flex space-x-2">
          <Rating v-model="rate" readonly :cancel="false" class="!text-yellow-500" />
          <p class="text-lg">(18)</p>
        </div>
        <div class="flex space-x-2 text-lg justify-start items-center">
          <i class="pi pi-users" style="font-size: 1.25rem" />
          <p>100</p>
        </div>
      </div>
      <div class="flex space-x-2 justify-start items-center">
        <i class="pi pi-tags" style="font-size: 1.25rem"></i>
        <Chip label="cardio" class="!text-xs"></Chip>
      </div>
      <div class="w-full h-28 text-ellipsis overflow-hidden">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil officia autem iure
        placeat...
      </div>
      <div class="align-bottom">
        <div class="flex justify-between items-center">
          <div class="flex">
            <Button
              icon="pi pi-trash"
              severity="danger"
              rounded
              text
              size="small"
              aria-label="actions"
            />
            <Button
              icon="pi pi-share-alt"
              severity="secondary"
              rounded
              text
              size="small"
              aria-label="actions"
            />
          </div>
          <Button
            label="Detail"
            rounded
            size="small"
            icon="pi pi-angle-right"
            iconPos="right"
            text
            outlined
            @click="$router.push({ name: 'challenges.show', params: { id: 1 } })"
          />
        </div>
      </div>
    </div>
  </div>
</template>
