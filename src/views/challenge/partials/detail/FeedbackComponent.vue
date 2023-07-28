<script setup>
import Avatar from 'primevue/avatar';
import { computed } from 'vue';
const props = defineProps(['message', 'type']);
defineEmits(['reply']);

const hasReplies = computed(() => {
  return props.message.replies.length > 0;
});
</script>
<template>
  <div class="flex gap-2 w-full">
    <Avatar :label="message.sender.name[0]" class="w-1/5 uppercase" shape="circle" size="large" />
    <div class="w-4/5">
      <div class="bg-gray-200 px-4 py-2 rounded-md w-full break-words min-h-[48px]">
        {{ message.content }}
      </div>
      <div
        class="flex justify-between px-2 text-sm font-medium text-gray-500"

      >
        <p>10 hours</p>
        <p
          class="cursor-pointer"
          @click="$emit('reply', $event, message.id)"
          :class="{ 'text-red-500': !hasReplies }"
          v-if="type == 'feedback'"
        >
          {{ hasReplies ? 'replied' : 'reply' }}
        </p>
      </div>
    </div>
  </div>
</template>
