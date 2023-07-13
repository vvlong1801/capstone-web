<script setup>
import Chart from 'primevue/chart';
import { ref, onMounted } from 'vue';

const props = defineProps(['data', 'labels', 'title', 'color']);

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: props.labels,
    datasets: [
      {
        label: props.title,
        backgroundColor: documentStyle.getPropertyValue(`--${props.color}-500`),
        borderColor: documentStyle.getPropertyValue(`--${props.color}-500`),
        data: props.data
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
</script>
<template>
  <div class="card">
    <Chart type="bar" :data="chartData" :options="chartOptions" class="h-full" />
  </div>
</template>
