<script setup>
import Chart from 'primevue/chart';
import { ref, watchEffect } from 'vue';

const props = defineProps(['labels', 'timeData', 'caloData']);

const chartData = ref();
const chartOptions = ref();
watchEffect(() => {
  const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
      labels: props?.labels,
      datasets: [
        {
          type: 'bar',
          label: 'Time Workout (minutes)',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: props?.timeData
        },
        {
          type: 'bar',
          label: 'Calories (10 cal)',
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
          borderColor: documentStyle.getPropertyValue('--orange-500'),
          data: props?.caloData
        }
      ]
    };
  };
  const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  };
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});
</script>
<template>
  <div class="card">
    <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />
  </div>
</template>
