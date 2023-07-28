<script setup>
import FeedbackComponent from './FeedbackComponent.vue';
import OverlayPanel from 'primevue/overlaypanel';

import { ref, computed, onMounted } from 'vue';
import { useChallengeStore } from '@/stores/challenge';
import { useRoute } from 'vue-router';

const replyBox = ref();
const replyId = ref();
const feedbackReply = ref('');
const store = useChallengeStore();
const route = useRoute();

onMounted(async () => {
  await store.getFeedbacks(route.params.id);
});

const toggleReplyBox = (event, id) => {
  replyBox.value.toggle(event);
  replyId.value = id;
};

const replyFeedback = computed(() => {
  let item = store.feedbacks.filter((item) => item.id == replyId.value);
  return item[0];
});

const onSend = async (event) => {
  await store.replyFeedback(route.params.id, replyId.value, {
    content: feedbackReply.value,
    receiver_id: replyFeedback.value.sender.id,
    sender_id: replyFeedback.value.receiver.id
  });
  await store.getFeedbacks(route.params.id);
  toggleReplyBox(event, null);
  feedbackReply.value = '';
};
</script>
<template>
  <overlay-panel ref="replyBox">
    <div class="w-80 flex flex-col gap-4">
      <div
        class="bg-gray-200 px-4 py-2 rounded-md w-full"
        v-for="reply in replyFeedback.replies"
        :key="reply.id"
      >
        {{ reply.content }}
      </div>
      <Textarea type="text" v-model="feedbackReply" />
      <div class="flex justify-between items-center">
        <Button
          size="small"
          severity="secondary"
          label="Cancel"
          @click="toggleReplyBox($event, null)"
        ></Button>
        <Button
          size="small"
          icon="pi pi-caret-right"
          icon-pos="right"
          label="Send"
          @click="onSend($event)"
        ></Button>
      </div>
    </div>
  </overlay-panel>
  <div class="w-full flex flex-col gap-4 height-box overflow-scroll">
    <feedback-component
      @reply="toggleReplyBox"
      v-for="feedback in store.feedbacks"
      :key="feedback.id"
      :message="feedback"
      type="feedback"
    ></feedback-component>
  </div>
</template>
<style scoped>
.height-box {
  height: calc(100vh - 300px);
}
</style>
