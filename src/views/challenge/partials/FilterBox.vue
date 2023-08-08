<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue';
import { useChallengeStore } from '@/stores/challenge';

const store = useChallengeStore();
const props = defineProps(['visible', 'data']);
const emits = defineEmits(['update:data']);

onMounted(async () => {
  await store.getChallengeTags();
});

const gender = ref('all');
const level = ref([]);
const selectedTag = ref([]);
const filtered = computed(() => props.data);

const genderOption = ['male', 'female', 'all'];
const levelOption = ['easy', 'middle', 'hard'];

watchEffect(() => {
  var filteredChallenge;
  if (props.visible) {
    filteredChallenge = filtered?.value?.filter((c) => {
      let result =
        c.for_gender == gender.value &&
        (level.value.includes(c.level?.value) || level.value.length == 0) &&
        (selectedTag.value.some((tagId) => c.tags.map((m) => m.id).includes(tagId)) ||
          selectedTag.value.length == 0);
      return result;
    });
  } else {
    filteredChallenge = props.data;
  }

  emits('update:data', filteredChallenge);
});
</script>
<template>
  <div class="card mb-6" v-if="visible">
    <div class="bg-gray-50 border border-slate-200 rounded-md p-6 space-y-6">
      <div class="flex gap-4">
        <div class="p-float-label flex-1">
          <Dropdown
            v-model="gender"
            :options="genderOption"
            placeholder="Select a gender"
            class="w-full"
            id="gender"
          />
          <label for="gender">Gender</label>
        </div>
        <div class="p-float-label flex-1">
          <MultiSelect
            v-model="level"
            :options="levelOption"
            display="chip"
            placeholder="Select level"
            :maxSelectedLabels="3"
            class="w-full md:w-20rem"
          />
          <label for="level">Level</label>
        </div>
      </div>
      <div class="flex gap-4">
        <div class="p-float-label flex-1">
          <MultiSelect
            v-model="selectedTag"
            :options="store.challengeTags"
            optionLabel="name"
            optionValue="id"
            display="chip"
            placeholder="Select tags"
            :maxSelectedLabels="3"
            class="w-full md:w-20rem"
          />
          <label for="tags">Tags</label>
        </div>
      </div>
    </div>
  </div>
</template>
