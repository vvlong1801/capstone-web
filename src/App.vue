<script setup>
window.Echo.private('App.Models.User.1').notification((e) => {
  console.log(e);
});
</script>

<template>
  <router-view></router-view>
</template>
