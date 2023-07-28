<script setup>
import BaseView from '@/views/BaseView.vue';
import ColumnChart from './partials/ColumnChart.vue';
import SessionResultTable from './partials/SessionResultTable.vue';
import MemberProfile from './partials/MemberProfile.vue'
</script>

<template>
  <base-view title="Detail Member">
    <div class="flex gap-6">
      <div class="card w-1/3">
        <member-profile>

        </member-profile>
      </div>
      <div class="w-2/3 space-y-6">
        <div class="flex space-x-6">
          <div class="card flex-1 min-h-[100px] text-center text-lg font-medium">
            <p class="text-slate-500">Last workout day</p>
            <p class="font-bold text-2xl">0</p>
          </div>
          <div class="card flex-1 text-center text-lg font-medium">
            <p class="text-slate-500">Total workout days</p>
            <p class="font-bold text-2xl">0</p>
          </div>
          <div class="card flex-1 text-center text-lg font-medium">
            <p class="text-slate-500">Current Session</p>
            <p class="font-bold text-2xl">0</p>
          </div>
        </div>

        <column-chart></column-chart>

        <session-result-table></session-result-table>
      </div>
    </div>
  </base-view>
</template>
