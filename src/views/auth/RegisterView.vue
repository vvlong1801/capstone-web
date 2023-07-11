<script setup>
import { useRegisterStore } from '@/stores/Auth/register.js';
import { RouterLink } from 'vue-router';
import { Form as VeeForm, Field as VeeField } from 'vee-validate';
import * as Yup from 'yup';
import { ref } from 'vue';

const store = useRegisterStore();
const registerForm = ref({});

const initForm = {
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
};
const validationSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email('invalid email').required(),
  password: Yup.string().required(),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

const onSubmit = async (values) => {
  Object.assign(store.form, values);
  await store.handleSubmit();
};
</script>
<template>
  <div class="z-10 min-w-fit">
    <div class="z-10 bg-white py-16 px-16 border rounded-lg">
      <div class="mb-4">
        <div class="text-xl font-bold mb-2">Register</div>
        <span class="text-[#757575] font-medium">Let‘s get started</span>
      </div>
      <div class="flex flex-col space-y-4">
        <VeeForm
          v-slot="{ handleSubmit }"
          :validation-schema="validationSchema"
          :initial-values="initForm"
          ref="registerForm"
          as="div"
          class="flex flex-col gap-4"
        >
          <VeeField name="name" v-slot="{ value, handleChange, errorMessage }" as="div">
            <span class="p-input-icon-left max-w-fit">
              <i class="pi pi-user" />
              <input
                class="p-inputtext p-component w-full md:w-[400px] !rounded-lg"
                id="name"
                type="text"
                :value="value"
                @input="handleChange"
                placeholder="Username"
                autocomplete="off"
              />
            </span>
            <div class="text-sm text-red-500">{{ errorMessage }}</div>
          </VeeField>
          <VeeField name="email" v-slot="{ value, handleChange, errorMessage }" as="div">
            <span class="p-input-icon-left max-w-fit">
              <i class="pi pi-envelope" />
              <input
                class="p-inputtext p-component w-full md:w-[400px] !rounded-lg"
                id="email"
                type="text"
                :value="value"
                @input="handleChange"
                placeholder="Email"
                autocomplete="off"
              />
            </span>
            <div class="text-sm text-red-500">{{ errorMessage }}</div>
          </VeeField>
          <VeeField name="password" v-slot="{ value, handleChange, errorMessage }" as="div">
            <span class="p-input-icon-left max-w-fit">
              <i class="pi pi-lock" />
              <input
                class="p-inputtext p-component w-full md:w-[400px] !rounded-lg"
                id="password"
                type="password"
                :value="value"
                @input="handleChange"
                placeholder="Password"
                autocomplete="off"
              />
            </span>
            <div class="text-sm text-red-500">{{ errorMessage }}</div>
          </VeeField>
          <VeeField
            name="password_confirmation"
            v-slot="{ value, handleChange, errorMessage }"
            as="div"
          >
            <span class="p-input-icon-left max-w-fit">
              <i class="pi pi-lock" />
              <input
                class="p-inputtext p-component w-full md:w-[400px] !rounded-lg"
                id="password_confirmation"
                type="password"
                :value="value"
                @input="handleChange"
                placeholder="Confirm Password"
                autocomplete="off"
              />
            </span>
            <div class="text-sm text-red-500">{{ errorMessage }}</div>
          </VeeField>
          <Button
            type="submit"
            label="Sign Up"
            :loading="store.loading"
            class="!bg-primary-500 !border-none !rounded-lg"
            @click="handleSubmit($event, onSubmit)"
          />
        </VeeForm>

        <RouterLink to="/auth/login" class="font-medium text-slate-500"
          >Already have an account? <span class="text-black">Login</span></RouterLink
        >
      </div>
    </div>
  </div>
</template>
