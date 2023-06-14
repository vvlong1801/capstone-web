<script setup>
import FileUpload from 'primevue/fileupload';
import InputSwitch from 'primevue/inputswitch';
import InputNumber from 'primevue/inputnumber';
import AutoComplete from 'primevue/autocomplete';
import Calendar from 'primevue/calendar';

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Form as VeeForm, Field as VeeField } from 'vee-validate';
import * as Yup from 'yup';
import { useChallengeStore } from '@/stores/challenge';
import { useFile } from '@/composables/file';

const router = useRouter();
const stepOne = ref(null);
const filteredChallengeTags = ref([]);

const store = useChallengeStore();
const fileService = useFile();

onMounted(async () => {
  if (store.form.name) {
    stepOne.value.setValues(store.form);
    stepOne.value.setFieldValue('start_at', new Date(store.form.start_at));
    stepOne.value.setFieldValue('finish_at', new Date(store.form.finish_at));
  }
  await store.getChallengeTags();
});

const handleUpload = async (event) => {
  await fileService.upload(event);
  stepOne.value.setFieldValue('image', fileService.file.value);
  console.log(fileService.file.value);
};

const searchChallengeTag = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredChallengeTags.value = [...store.challengeTags];
    } else {
      console.log(stepOne.value.getValues());
      let filtered = store.challengeTags.filter((tag) => {
        return tag.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
      if (filtered.length) {
        filteredChallengeTags.value = [...filtered];
      } else {
        filteredChallengeTags.value = [{ id: null, name: event.query }];
      }
    }
  }, 250);
};
const onSubmit = (values) => {
  Object.assign(store.form, values);
  router.push({ name: 'challenges.create.step_two' });
};

const initForm = {
  start_at: new Date(),
  finish_at: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
  public: true,
  create_group: false,
  max_members: 10,
  tags: [],
  invitation: [],
  accept_all: true
};
const validationSchema = Yup.object({
  name: Yup.string(),
  sort_desc: Yup.string().required(),
  description: Yup.string(),
  start_at: Yup.date().default(new Date()),
  finish_at: Yup.date().default(new Date()),
  public: Yup.boolean(),
  create_group: Yup.boolean(),
  max_members: Yup.number().nullable(),
  tags: Yup.array(),
  template: Yup.object(),
  invitation: Yup.array(),
  image: Yup.object().required(),
  accept_all: Yup.boolean()
});
</script>
<template>
  <VeeForm
    v-slot="{ handleSubmit }"
    :validation-schema="validationSchema"
    :initial-values="initForm"
    ref="stepOne"
    as="div"
    class="flex flex-col gap-8"
  >
    <Toast />
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-semibold">Basic Information</h1>
        <h3 class="text-sm p-text-secondary">Enter basic information & permission</h3>
      </div>
      <div class="flex items-center space-x-4">
        <VeeField name="public" v-slot="{ field, handleChange }">
          <InputSwitch :model-value="field.value" @update:model-value="handleChange" />
          <label class="text-md font-medium">Public</label>
        </VeeField>
        <VeeField name="create_group" v-slot="{ field, handleChange }">
          <InputSwitch :model-value="field.value" @update:model-value="handleChange" />
          <label class="text-md font-medium">Create Group</label>
        </VeeField>
      </div>
    </div>
    <div class="flex gap-8 w-full">
      <div class="w-1/2 grid grid-cols-2 grid-flow-row gap-8 h-fit">
        <VeeField
          name="name"
          v-slot="{ value, handleChange, errorMessage }"
          as="div"
          class="col-span-2"
        >
          <div class="p-float-label">
            <InputText
              id="name"
              autocomplete="off"
              class="!w-full"
              :model-value="value"
              @update:model-value="handleChange"
            />
            <label for="name">Challenge Name</label>
          </div>
          <span class="text-sm text-red-500">{{ errorMessage }}</span>
        </VeeField>

        <VeeField
          name="sort_desc"
          v-slot="{ value, handleChange, errorMessage }"
          as="div"
          class="col-span-2"
        >
          <div class="p-float-label">
            <InputText
              id="sort_desc"
              class="!w-full"
              :model-value="value"
              @update:model-value="handleChange"
              :class="{ 'p-invalid': errorMessage }"
            />
            <label for="sort_desc">Subtitle</label>
          </div>
          <span class="text-xs ml-2 text-red-500" v-if="errorMessage">{{ errorMessage }}</span>
        </VeeField>
        <VeeField name="start_at" v-slot="{ value, handleChange, errorMessage }" as="div">
          <div class="p-float-label">
            <Calendar
              class="!w-full"
              :model-value="value"
              @update:model-value="handleChange"
              dateFormat="dd/mm/yy"
            />
            <label for="start_at">Start at</label>
          </div>
          <span class="text-xs ml-2 text-red-500" v-if="errorMessage">{{ errorMessage }}</span>
        </VeeField>
        <VeeField name="finish_at" v-slot="{ value, handleChange, errorMessage }" as="div">
          <div class="p-float-label">
            <Calendar
              class="!w-full"
              :model-value="value"
              @update:model-value="handleChange"
              dateFormat="dd/mm/yy"
            />
            <label for="finish_at">Finish at</label>
          </div>
          <span class="text-xs ml-2 text-red-500" v-if="errorMessage">{{ errorMessage }}</span>
        </VeeField>
        <VeeField name="tags" v-slot="{ value: tags, handleChange }">
          <div class="col-span-2">
            <div class="p-float-label w-full">
              <AutoComplete
                :model-value="tags"
                @update:model-value="handleChange"
                multiple
                :suggestions="filteredChallengeTags"
                optionLabel="name"
                class="!block"
                inputId="tags"
                @complete="searchChallengeTag"
              />
              <label for="tags" class="max-w-full">Tags</label>
            </div>
          </div>
        </VeeField>
        <VeeField
          name="max_members"
          v-model="store.form.max_members"
          v-slot="{ value, handleChange, errorMessage }"
          as="div"
        >
          <span class="p-float-label">
            <InputNumber
              id="max-members"
              class="!w-full"
              :model-value="value"
              @update:model-value="handleChange"
            />
            <label for="max-members">Max members</label>
          </span>
          <span class="text-xs ml-2 text-red-500" v-if="errorMessage">{{ errorMessage }}</span>
        </VeeField>

        <VeeField
          name="description"
          v-slot="{ value, handleChange, errorMessage }"
          as="div"
          class="col-span-2"
        >
          <span class="p-float-label">
            <Textarea
              rows="5"
              :model-value="value"
              @update:model-value="handleChange"
              class="!w-full"
            />
            <label for="description">Description</label>
          </span>
          <span class="text-xs ml-2 text-red-500" v-if="errorMessage">{{ errorMessage }}</span>
        </VeeField>
      </div>
      <div class="w-1/2">
        <VeeField name="image" v-slot="{ value, handleChange, errorMessage }">
          <FileUpload
            auto
            custom-upload
            accept="image/*"
            :maxFileSize="1000000"
            @uploader="handleUpload"
            :model-value="value"
            @update:model-value="handleChange"
          >
            <template #header="{ chooseCallback }">
              <div class="flex flex-wrap justify-between items-center flex-1 gap-2">
                <div class="flex gap-2">
                  <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined></Button>
                </div>
              </div>
            </template>
            <template #content>
              <div v-if="value" class="h-[320px] mx-4">
                <img :alt="value.name" :src="value.url" class="h-full w-full object-cover" />
              </div>
              <div v-else class="h-[320px]">
                <p>Drag and drop files to here to upload.</p>
              </div>
            </template>
          </FileUpload>
          <span class="text-xs ml-2 text-red-500" v-if="errorMessage">{{ errorMessage }}</span>
        </VeeField>
      </div>
    </div>
    <div class="flex justify-end">
      <Button
        label="Next"
        icon="pi pi-arrow-right"
        iconPos="right"
        @click="handleSubmit($event, onSubmit)"
      />
    </div>
  </VeeForm>
</template>
