<script setup>
import Rating from 'primevue/rating';
defineProps(['challenge']);
defineEmits(['delete']);

const getSeverityStatus = (status) => {
  switch (status) {
    case 'init':
      return 'warning';
    case 'active':
      return 'primary';
    case 'disapprove':
      return 'danger';
    case 'cancel':
      return 'danger';
    default:
      return 'info';
  }
};
</script>
<template>
  <div class="relative h-fit border p-outline-primary rounded-md min-h-[500px] overflow-hidden">
    <img
      :src="challenge.main_image?.url"
      alt="banner"
      srcset=""
      class="w-full h-[200px] object-cover"
    />
    <div class="p-4 space-y-2">
      <div class="flex space-x-4 justify-between items-center">
        <h1 class="text-xl font-bold p-text-primary truncate">{{ challenge.name }}</h1>
        <!-- <i class="pi pi-lock !text-red-600"></i> -->
        <Tag
          :value="challenge.status"
          class="!text-xs"
          :severity="getSeverityStatus(challenge.status)"
        ></Tag>
      </div>

      <div class="flex justify-between">
        <div class="flex space-x-2">
          <Rating :model-value="challenge.rate" readonly :cancel="false" class="!text-yellow-500" />
          <p class="text-lg">{{ `(${challenge.num_rate})` }}</p>
        </div>
        <div class="flex space-x-2 text-lg justify-start items-center">
          <i class="pi pi-users" style="font-size: 1.25rem" />
          <p>{{ challenge.members_count }}</p>
        </div>
      </div>
      <div class="flex space-x-2 justify-start items-center">
        <i class="pi pi-tags" style="font-size: 1.25rem"></i>
        <Chip :label="tag.name" class="!text-xs" v-for="tag in challenge.tags" :key="tag.id"></Chip>
      </div>
      <div class="w-full h-28 text-ellipsis overflow-hidden">
        {{ challenge.sort_desc }}
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
              @click.stop="$emit('delete', challenge.id)"
            />
            <!-- <Button
              icon="pi pi-share-alt"
              severity="secondary"
              rounded
              text
              size="small"
              aria-label="actions"
            /> -->
          </div>
          <Button
            label="Detail"
            rounded
            size="small"
            icon="pi pi-angle-right"
            iconPos="right"
            text
            outlined
            @click="$router.push({ name: 'challenges.show', params: { id: challenge.id } })"
          />
        </div>
      </div>
    </div>
  </div>
</template>
