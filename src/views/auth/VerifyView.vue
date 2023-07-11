<script setup>
import { useRegisterStore } from '@/stores/Auth/register.js';
const store = useRegisterStore();
</script>
<template>
  <div class="z-10 min-w-fit">
    <div class="z-10 bg-white py-16 px-16 border rounded-lg">
      <div class="mb-4">
        <div class="text-xl font-bold mb-2">Confirm Verification</div>
        <span class="text-slate-500 font-medium">We have sent code to you email:</span>
      </div>
      <div class="flex flex-col space-y-4">
        <div class="flex items-center">
          <i class="pi pi-envelope"></i>
          <span class="ml-4 font-medium">{{ store.verifyEmail }}</span>
        </div>
        <p class="text-slate-500 font-medium">
          Please check your email and click button "verify email"
        </p>
        <Button
          type="submit"
          icon="pi pi-arrow-right"
          iconPos="right"
          label="Go to Login"
          class="!bg-primary-500 !border-none !rounded-lg"
          @click="() => $router.push('/auth/login')"
        />
      </div>
    </div>
  </div>
</template>
