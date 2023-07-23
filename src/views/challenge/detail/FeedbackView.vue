<script setup>
import { ref, onMounted } from "vue";
import Avatar from 'primevue/avatar';
import DataView from 'primevue/dataview';
import { fetchChallengeFeedbacks } from '../../../services/challenge';
import 'primeflex/primeflex.css';

onMounted(() => {
  fetchChallengeFeedbacks().then((data) => (feedbacks.value = data));
});

const feedbacks = ref();

</script>

<template>
      <DataView :value="feedbacks" paginator :rows="5">
          <template #list="feedback">
              <div class="col-12 flex gap-4 py-2 items-center">
                  <div class="flex flex-column gap-1">
                    <Avatar
                      icon="pi pi-user"
                      class="mr-2"
                      style="background-color: #2196f3; color: #ffffff"
                      shape="circle"
                    />
                    <span>{{ feedback.data.name }}</span>
                  </div>
                  <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div class="flex flex-column align-items-center sm:align-items-start gap-y-1">
                            <span class="">{{ feedback.data.feedback }}</span>
                            <span class="text-xs">{{ feedback.data.createdAt }}</span>
                        </div>
                    </div>
              </div>
          </template>
      </DataView>
</template>