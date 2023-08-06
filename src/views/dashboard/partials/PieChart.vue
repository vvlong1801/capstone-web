<script setup>
import Chart from 'primevue/chart';
import { ref, watchEffect } from 'vue';
const props = defineProps(['data', 'labels', 'title', 'color']);
const chartData = ref();
const chartOptions = ref({
  plugins: {
    legend: {
      labels: {
        usePointStyle: true
      }
    }
  }
});


watchEffect(() => {
  const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
      labels: props.labels,
      datasets: [
        {
          data: props.data,
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--gray-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--gray-400')
          ]
        }
      ]
    };
  };
  chartData.value = setChartData();
});

</script>
<template>
  <div class="card flex justify-center items-center">
    <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
  </div>
</template>
