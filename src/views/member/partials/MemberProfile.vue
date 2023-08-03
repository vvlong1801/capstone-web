<script setup>
import Image from 'primevue/image';
import Avatar from 'primevue/avatar';

defineProps(['data']);
</script>
<template>
  <div class="flex flex-col gap-8 items-center">
    <Image alt="Image" preview class="!rounded-full mb-6">
      <template #indicatoricon>
        <i class="pi pi-eye"></i>
      </template>
      <template #image>
        <div class="rounded-full w-60 h-60">
          <Avatar
            :image="data?.avatar?.url"
            :label="data?.name[0]"
            class="!w-full !h-full !text-6xl uppercase"
            shape="circle"
            style="background-color: #2196f3; color: #ffffff"
          />
        </div>
      </template>
      <template #preview="slotProps" v-if="data?.avatar">
        <img :src="data?.avatar?.url" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
      </template>
    </Image>

    <div class="p-float-label w-full">
      <InputText id="name" :model-value="data?.name" class="!w-full" disabled />
      <label for="name">Name</label>
    </div>
    <div class="p-float-label w-full">
      <InputText id="email" :model-value="data?.email" class="!w-full" disabled />
      <label for="email">email</label>
    </div>
    <div class="flex space-x-4">
      <div class="p-float-label flex-1">
        <InputText id="age" :model-value="data?.age" class="!w-full" disabled />
        <label for="age">Age</label>
      </div>
      <div class="p-float-label flex-1">
        <InputText id="gender" :model-value="data?.gender" class="!w-full" disabled />
        <label for="gender">Gender</label>
      </div>
      <div class="p-float-label flex-1">
        <InputText id="level" :model-value="data?.level" class="!w-full" disabled />
        <label for="level">Level</label>
      </div>
    </div>
  </div>
</template>
