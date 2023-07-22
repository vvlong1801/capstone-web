<script setup>
import FileUpload from 'primevue/fileupload';
import InputSwitch from 'primevue/inputswitch';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import AutoComplete from 'primevue/autocomplete';
import Calendar from 'primevue/calendar';

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Form as VeeForm, Field as VeeField } from 'vee-validate';
import * as Yup from 'yup';
import { useChallengeStore } from '@/stores/challenge';
import { useFile } from '@/composables/file';
import { GENDER } from '@/utils/option';

const router = useRouter();
const stepOne = ref({});
const filteredChallengeTags = ref([]);

const store = useChallengeStore();
var { file, upload } = useFile();

const initForm = {
  start_at: new Date(),
  finish_at: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
  public: true,
  create_group: false,
  max_members: 10,
  for_gender: GENDER[0].value,
  tags: [],
  invitation: [],
  accept_all: true,
  images: []
};
const validationSchema = Yup.object({
  name: Yup.string(),
  sort_desc: Yup.string().required(),
  description: Yup.string().required(),
  start_at: Yup.date().default(new Date()),
  finish_at: Yup.date().default(new Date()),
  public: Yup.boolean(),
  create_group: Yup.boolean(),
  max_members: Yup.number().nullable(),
  for_gender: Yup.string().required(),
  tags: Yup.array().nullable(),
  template: Yup.object(),
  invitation: Yup.array(),
  images: Yup.array().min(1).required(),
  accept_all: Yup.boolean(),
  youtube_url: Yup.string().matches(
    /^(https?:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/,
    'link format must be youtube'
  )
});

onMounted(async () => {
  if (store.form.name) {
    stepOne.value.setValues(store.form);
    stepOne.value.setFieldValue('start_at', new Date(store.form.start_at));
    stepOne.value.setFieldValue('finish_at', new Date(store.form.finish_at));
  }

  await store.getChallengeTags();
});

const handleUpload = (event) => {
  event.files.forEach(async (f) => {
    await upload(f);
    console.log(file);
    stepOne.value.setFieldValue('images', [...stepOne.value.getValues().images, file.value]);
  });
};

const onRemoveFile = (index) => {
  stepOne.value.setFieldValue(
    'images',
    stepOne.value.getValues().images.filter((_, idx) => idx !== index)
  );
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
</script>
<template>
  <VeeForm
    v-slot="{ handleSubmit, values }"
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
        <!-- <VeeField name="create_group" v-slot="{ field, handleChange }">
          <InputSwitch :model-value="field.value" @update:model-value="handleChange" />
          <label class="text-md font-medium">Create Group</label>
        </VeeField> -->
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
          name="for_gender"
          v-model="store.form.for_gender"
          v-slot="{ value, handleChange, errorMessage }"
          as="div"
        >
          <SelectButton
            :model-value="value"
            @update:model-value="handleChange"
            dataKey="value"
            optionValue="value"
            :options="GENDER"
            aria-labelledby="multiple"
            class="grid grid-cols-3"
          >
            <template #option="slotProps">
              <div class="flex items-center justify-center w-full">
                <p class="capitalize">{{ slotProps.option.label }}</p>
              </div>
            </template>
          </SelectButton>

          <span class="text-xs ml-2 text-red-500" v-if="errorMessage">{{ errorMessage }}</span>
        </VeeField>
        <VeeField
          name="youtube_url"
          v-slot="{ value, handleChange, errorMessage }"
          as="div"
          class="col-span-2"
        >
          <div class="p-inputgroup flex-1">
            <div class="p-float-label">
              <InputText
                id="youtube_url"
                class="!w-full"
                :model-value="value"
                @update:model-value="handleChange"
                :class="{ 'p-invalid': errorMessage }"
              />
              <label for="youtube_url">Link intro challenge on youtube</label>
            </div>
            <span class="p-inputgroup-addon">
              <i class="pi pi-youtube"></i>
            </span>
          </div>
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
        <VeeField name="images" v-slot="{ value, handleChange, errorMessage }">
          <FileUpload
            auto
            custom-upload
            accept="image/*"
            :maxFileSize="1000000"
            @uploader="handleUpload"
            :model-value="value"
            @update:model-value="handleChange"
            :multiple="true"
          >
            <template #header="{ chooseCallback }">
              <div class="flex flex-wrap justify-between items-center flex-1 gap-2">
                <div class="flex gap-2">
                  <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined></Button>
                </div>
              </div>
            </template>
            <template #content>
              <div class="grid grid-cols-2 grid-flow-row gap-6 p-2">
                <div
                  v-for="(file, index) in value"
                  :key="file.filename + index"
                  class="m-0 flex flex-col gap-3"
                >
                  <div class="h-40 w-full object-fill">
                    <img
                      role="presentation"
                      :alt="file.filename"
                      :src="file.url"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="font-semibold flex justify-between items-center w-full">
                    <p>{{ file.filename }}</p>
                    <i
                      class="pi pi-times text-red-500 cursor-pointer"
                      @click="onRemoveFile(index)"
                    ></i>
                  </div>
                </div>
              </div>
            </template>
          </FileUpload>
          <span class="text-xs ml-2 text-red-500" v-if="errorMessage">{{ errorMessage }}</span>
        </VeeField>
      </div>
    </div>
    <slot name="action" :data="values">
      <div class="flex justify-end">
        <Button
          label="Next"
          icon="pi pi-arrow-right"
          iconPos="right"
          @click="handleSubmit($event, onSubmit)"
        />
      </div>
    </slot>
  </VeeForm>
</template>
