<script setup>
import Card from 'primevue/card'

const props = defineProps(['card']);
</script>


<template>
  <div class="card flex items-center justify-center">
    <Card style="width: 25em" p-card-title="text-center" p-card-content="text-center">
        <template #header>
            <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
        </template>
        <template #title p-card-title="text-center">{{ card.title }}</template>
        <template #content p-card-content="text-center">
            <p class="text-5xl text-green-500">
              {{ card.content }}
            </p>
        </template>
    </Card>
  </div>
</template>
