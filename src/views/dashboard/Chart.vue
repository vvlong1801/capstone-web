<script setup>
import Chart from 'primevue/chart'
import { ref, onMounted } from "vue";

onMounted(() => {
    newMemberChartData.value = setNewMemberChartData();
    newMemberChartOptions.value = setNewMemberChartOptions();

    newChallengeChartData.value = setNewChallengeChartData();
    newChallengeChartOptions.value = setNewChallengeChartOptions();

    top5ChallengesChartData.value = setTop5ChallengesChartData();
});

const newMemberChartData = ref();
const newMemberChartOptions = ref();

const newChallengeChartData = ref();
const newChallengeChartOptions = ref();

const top5ChallengesChartData = ref();
const top5ChallengesChartOptions = ref({
    plugins: {
        legend: {
            labels: {
                usePointStyle: true
            }
        }
    }
});

        
const setNewMemberChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'New members',
                data: [5, 18, 6, 20, 1, 14, 19],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4
            },
            {
                label: 'New creators',
                data: [8, 4, 0, 10, 3, 2, 8],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: 0.4
            }
        ]
    };
}
const setNewMemberChartOptions = () => {
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
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

const setNewChallengeChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            {
                label: 'New challenges',
                data: [2, 10, 8, 32, 16, 11, 19],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.6
            }
        ]
    };
}
const setNewChallengeChartOptions = () => {
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


const setTop5ChallengesChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['Challenge 4', 'Challenge 2', 'Challenge 1', 'Challenge 5', 'Challenge 3'],
        datasets: [
            {
                data: [14, 6, 30, 34, 20],
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--pink-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--pink-400')]
            }
        ]
    };
};
</script>


<template>
  <div class="grid grid-cols-2 gap-x-6">
    <div>
      <h4 class="mb-2">New users per month</h4>
      <div class="card">
        <Chart type="line" :data="newMemberChartData" :options="newMemberChartOptions" class="h-80rem" />
      </div>
    </div>

    <div>
      <h4 class="mb-2">New challenges in 7 nearest days</h4>
      <div class="card">
        <Chart type="line" :data="newChallengeChartData" :options="newChallengeChartOptions" class="h-80rem" />
      </div>
    </div>
  </div>
  
  <div>
    <h4 class="mb-2">5 challenges by most users participate</h4>
    <div class="card flex justify-center w-full">
      <Chart type="pie" :data="top5ChallengesChartData" :options="top5ChallengesChartOptions" class="w-1/2 h-40rem" />
    </div>
  </div>
</template>
