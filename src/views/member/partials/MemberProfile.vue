<script setup>
import Image from 'primevue/image';
import Avatar from 'primevue/avatar';
import ImageSrc from '@/assets/images/avatar.jpg';
import { ref } from 'vue';

const profile = ref({
  name: 'long',
  email: 'long@gmail.com',
  age: 18,
  gender: 'female',
  level: 'beginner'
});
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
            :image="ImageSrc"
            class="!w-full !h-full"
            shape="circle"
            style="background-color: #2196f3; color: #ffffff"
          />
        </div>
      </template>
      <template #preview="slotProps">
        <img :src="ImageSrc" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
      </template>
    </Image>

    <div class="p-float-label w-full">
      <InputText id="name" v-model="profile.name" class="!w-full" disabled/>
      <label for="name">Name</label>
    </div>
    <div class="p-float-label w-full">
      <InputText id="email" v-model="profile.email" class="!w-full" disabled/>
      <label for="email">email</label>
    </div>
    <div class="flex space-x-4">
      <div class="p-float-label flex-1">
        <InputText id="age" v-model="profile.age" class="!w-full" disabled/>
        <label for="age">Age</label>
      </div>
      <div class="p-float-label flex-1">
        <InputText id="gender" v-model="profile.gender" class="!w-full" disabled/>
        <label for="gender">Gender</label>
      </div>
      <div class="p-float-label flex-1">
        <InputText id="level" v-model="profile.level" class="!w-full" disabled/>
        <label for="level">Level</label>
      </div>
    </div>
  </div>
</template>
