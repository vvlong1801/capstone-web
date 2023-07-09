<script setup>
import Chart from 'primevue/chart'
import { ref, onMounted } from "vue";

onMounted(() => {
    timePerDayChartData.value = setTimePerDayChartData();
    timePerDayChartOptions.value = setTimePerDayChartOptions();
});

const timePerDayChartData = ref();
const timePerDayChartOptions = ref();
        
const setTimePerDayChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            {
                label: 'Practice time per day',
                data: [5, 3, 7, 6, 2, 3, 4],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4
            },
        ]
    };
}
const setTimePerDayChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
        }
    };
}

</script>


<template>
  <div>
    <h4 class="mb-2">Practice time per day</h4>
    <div class="card">
      <Chart type="line" :data="timePerDayChartData" :options="timePerDayChartOptions" class="h-80rem" />
    </div>
  </div>
</template>
