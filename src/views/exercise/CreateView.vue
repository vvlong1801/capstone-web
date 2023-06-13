<script setup>
import BaseView from '../BaseView.vue';
import FormExercise from './partials/FormComponent.vue';
import { onMounted } from 'vue';
import { useExerciseStore } from '@/stores/exercise';
const { form, createExercise } = useExerciseStore();
onMounted(form.resetForm);
</script>
<template>
  <base-view title="Create Exercises">
    <form-exercise @handle-submit="createExercise" />
  </base-view>
</template>
