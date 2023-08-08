<script setup>
defineProps(['information', 'showEditButton', 'showEditDialog']);
defineEmits(['approve', 'unApprove']);
</script>
<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center space-x-6">
      <div class="flex space-x-2 items-center">
        <i class="pi pi-tags" style="font-size: 1.25rem"></i>
        <Chip
          :label="tag.name"
          class="!text-sm"
          v-for="tag in information.tags"
          :key="tag.id"
        ></Chip>
      </div>
      <div v-if="!showEditButton && information.status == 'init'">
        <Button
          label="UnApprove"
          severity="secondary"
          text
          icon="pi pi-times"
          class="cursor-pointer"
          @click="$emit('unApprove')"
        />
        <Button
          label="Approve"
          severity="warning"
          text
          icon="pi pi-check"
          class="cursor-pointer"
          @click="$emit('approve')"
        />
      </div>
      <Button
        label="Edit"
        severity="warning"
        text
        icon="pi pi-pencil"
        @click="$emit('showEditDialog')"
        v-if="showEditButton"
      />
    </div>
    <div class="flex items-end">
      <h1 class="text-2xl font-bold p-text-primary mr-2">
        {{ information.name }}
      </h1>
      <span class="text-md font-normal p-text-secondary">{{
        information.public ? ' (public)' : ' (private)'
      }}</span>
    </div>
    <div class="flex justify-start items-center space-x-2 font-normal">
      <i class="pi pi-clock"></i>
      <p>
        Start at:
        {{ new Date(information.start_at).toDateString() }}
      </p>
      <i class="pi pi-arrow-right"></i>
      <p>
        Finish at:
        {{ new Date(information.finish_at).toDateString() }}
      </p>
    </div>
    <div class="flex space-x-8">
      <div class="flex-1 grid grid-cols-2 gap-4">
        <div class="border rounded-md px-4 py-2 flex items-center">
          <p class="font-normal mr-2">Level:</p>
          <p class="font-normal">Easy</p>
        </div>
        <div class="border rounded-md px-4 py-2 flex items-center">
          <p class="font-normal mr-2">Max Members:</p>
          <p class="font-normal">{{ information.max_members }}</p>
        </div>
        <div class="border rounded-md px-4 py-2 flex items-center">
          <p class="font-normal mr-2">Status:</p>
          <p class="font-normal">{{ information.status }}</p>
        </div>
        <div class="border rounded-md px-4 py-2 flex items-center">
          <p class="font-normal mr-2">Gender:</p>
          <p class="font-normal">{{ information.for_gender }}</p>
        </div>
        <div class="col-span-2 border rounded-md px-4 py-2 max-h-fit">
          <div v-html="information.description?.replace(/\n/g,'<br>')">
          </div>
        </div>
      </div>
      <div class="flex-1 w-full">
        <div class="grid grid-cols-2 grid-flow-row gap-4 w-full">
          <img
            v-for="img in information.images"
            :src="img.url"
            alt="challenge image"
            srcset=""
            :key="img.path"
            class="object-cover h-40 w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>
