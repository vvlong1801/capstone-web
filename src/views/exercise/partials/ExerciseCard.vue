<script setup>
import { defineProps, ref } from 'vue';

defineProps(['exercise', 'showAction', 'expand']);
const showExpand = ref(false);
</script>
<template>
  <div class="card h-fit space-y-2 !p-4">
    <div class="h-20 flex gap-4 drop-shadow-none shadow-none">
      <slot name="append"></slot>
      <img :src="exercise.image.url" alt="abc" class="w-20 h-20 object-cover rounded-md" />
      <div class="content w-full py-1 flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <p class="font-bold text-lg">{{ exercise.name }}</p>
          <slot name="action" v-if="showAction">
            <div class="space-x-2">
              <i
                class="pi pi-pencil cursor-pointer"
                @click="
                  $router.push({
                    name: 'exercise.edit',
                    params: {
                      id: exercise.id
                    }
                  })
                "
              ></i>
              <i class="pi pi-trash cursor-pointer" @click="$emit('clickDelete', exercise.id)"></i>
            </div>
          </slot>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex items-center justify-between w-full">
            <slot name="info">
              <Tag :severity="exercise.level?.severity" :value="exercise.level?.label" />
              <p class="font-normal text-sm text-gray-500">
                {{ exercise.created_by }}
              </p>
            </slot>
          </div>
          <i
            class="pi pi-angle-down cursor-pointer pl-2"
            :class="{ 'pi-angle-down': !showExpand, 'pi-angle-up': showExpand }"
            v-if="expand"
            @click="showExpand = !showExpand"
          ></i>
        </div>
      </div>
    </div>
    <slot name="expand" v-if="showExpand"> <div class="min-h-[40px]"></div></slot>
  </div>
</template>
