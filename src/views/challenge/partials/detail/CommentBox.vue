<script setup>
import FeedbackComponent from './FeedbackComponent.vue';

import { onMounted } from 'vue';
import { useChallengeStore } from '@/stores/challenge';
import { useRoute } from 'vue-router';

const store = useChallengeStore();
const route = useRoute();

onMounted(async () => {
  await store.getComments(route.params.id);
});
</script>
<template>
  <div class="w-full flex flex-col gap-4 height-box overflow-scroll">
    <feedback-component
      v-for="cmt in store.comments"
      :key="cmt.id"
      :message="cmt"
    ></feedback-component>
  </div>
</template>
<style scoped>
.height-box {
  height: calc(100vh - 300px);
}
</style>
