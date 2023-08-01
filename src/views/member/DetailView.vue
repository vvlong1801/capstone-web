<script setup>
import BaseView from '@/views/BaseView.vue';
import ColumnChart from './partials/ColumnChart.vue';
import SessionResultTable from './partials/SessionResultTable.vue';
import MemberProfile from './partials/MemberProfile.vue';
import { computed, onMounted } from 'vue';
import { useMemberStore } from '@/stores/member';
import { useRoute } from 'vue-router';

const store = useMemberStore();
const route = useRoute();
onMounted(async () => {
  await store.getMemberById(route.params.id);
});

const timeInDayLabels = computed(() => {
  let labels = store.detailMember?.time_in_day.map((item) => item.day);
  return labels;
});
const timeInDayData = computed(() => {
  return store.detailMember?.time_in_day.map((item) => timeStringToMinutes(item.total_duration));
});

// const caloInDayLabels = computed(() => {
//   return store.detailMember?.cal_in_day.map((item) => item.day);
// });
const caloInDayData = computed(() => {
  let data = store.detailMember?.cal_in_day.map((item) => item.cal_sum/10);
  console.log(data);
  return data;
});

const timeStringToMinutes = (timeString) => {
  const timeParts = timeString.split(':');
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
}
</script>

<template>
  <base-view title="Detail Member">
    <div class="flex gap-6">
      <div class="card w-1/3">
        <member-profile :data="store.detailMember?.workout_user"> </member-profile>
      </div>
      <div class="w-2/3 space-y-6">
        <div class="flex space-x-6">
          <div class="card flex-1 min-h-[100px] text-center text-lg font-medium">
            <p class="text-slate-500">Last workout day</p>
            <p class="font-bold text-2xl">{{ store.detailMember?.last_workout_day }}</p>
          </div>
          <div class="card flex-1 text-center text-lg font-medium">
            <p class="text-slate-500">Total workout days</p>
            <p class="font-bold text-2xl">{{ store.detailMember?.session_count }}</p>
          </div>
          <div class="card flex-1 text-center text-lg font-medium">
            <p class="text-slate-500">Current Session</p>
            <p class="font-bold text-2xl">{{ store.detailMember?.current_session }}</p>
          </div>
        </div>

        <column-chart :labels="timeInDayLabels" :time-data="timeInDayData" :calo-data="caloInDayData"></column-chart>

        <session-result-table :data="store.detailMember?.sessions"></session-result-table>
      </div>
    </div>
  </base-view>
</template>
