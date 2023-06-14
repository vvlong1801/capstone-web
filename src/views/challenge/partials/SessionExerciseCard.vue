<script setup>
import { ref, defineProps } from 'vue';

const showRequireBox = ref(false);
const props = defineProps(['exercise']);
</script>
<template>
  <div class="card min-h-28 p-4 drop-shadow-none shadow-none space-y-4">
    <div class="flex gap-4 items-center">
      <i class="pi pi-align-justify handle cursor-move"></i>
      <img src="@/assets/images/banner.jpg" alt="abc" class="w-20 h-20 object-cover rounded-md" />
      <div class="w-full py-1">
        <div class="flex justify-between items-center">
          <p class="font-bold text-lg">{{ exercise.name }}</p>
          <i class="pi pi-times text-red-500"></i>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex gap-2">
            <Chip
              severity="success"
              :label="exercise.level"
              class="!text-xs !bg-green-500 !text-white"
            />
            <Chip severity="secondary" label="2 sets" class="!text-xs" />
            <Chip severity="secondary" label="10 reps" class="!text-xs" />
          </div>
          <i
            class="cursor-pointer"
            :class="showRequireBox ? 'pi pi-angle-up' : 'pi pi-angle-down'"
            severity="danger"
            @click="showRequireBox = !showRequireBox"
          ></i>
        </div>
      </div>
    </div>
    <div class="flex gap-4" v-if="showRequireBox">
      <div class="p-inputgroup flex-1">
        <InputText placeholder="2" />
        <span class="p-inputgroup-addon"> sets </span>
      </div>
      <div class="p-inputgroup flex-1">
        <InputText placeholder="10" />
        <span class="p-inputgroup-addon"> reps </span>
      </div>
    </div>
  </div>
</template>
