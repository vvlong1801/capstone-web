<script setup>
defineProps(["title", "data"])
</script>
<template>
  <div class="card flex-1 min-h-[100px] text-center text-lg font-medium">
    <p class="text-slate-500">{{ title }}</p>
    <p class="font-bold text-2xl">{{data}}</p>
  </div>
</template>
