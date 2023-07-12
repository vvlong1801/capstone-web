<script setup>
import Chart from 'primevue/chart';
import { ref, onMounted } from 'vue';

onMounted(() => {
  chartData.value = setChartData();
});

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

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [540, 325, 702],
        backgroundColor: [
          documentStyle.getPropertyValue('--blue-500'),
          documentStyle.getPropertyValue('--yellow-500'),
          documentStyle.getPropertyValue('--green-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--blue-400'),
          documentStyle.getPropertyValue('--yellow-400'),
          documentStyle.getPropertyValue('--green-400')
        ]
      }
    ]
  };
};
</script>
<template>
  <div class="card flex justify-center items-center">
    <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
  </div>
</template>
