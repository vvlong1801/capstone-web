<script setup>
import BaseView from "../BaseView.vue";
import FormExercise from "./partials/FormComponent.vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { useExerciseStore } from "@/stores/exercise";

const route = useRoute();
const store = useExerciseStore();
onMounted(async () => {
  await store.getExerciseById(route.params.id);
  store.form.setValues(store.editItem);
});
</script>
<template>
  <base-view title="Edit Exercises">
    <form-exercise
      type="edit"
      @handle-submit="store.editExercise"
    />
  </base-view>
</template>