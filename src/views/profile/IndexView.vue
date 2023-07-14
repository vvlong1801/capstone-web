<script setup>
import BaseView from '@/views/BaseView.vue';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import InputNumber from 'primevue/inputnumber';
import Avatar from 'primevue/avatar';
import { onMounted, ref } from 'vue';
import { useFile } from '@/composables/file.js';
import { useProfileStore } from '@/stores/profile';
import { Form as VeeForm, Field as VeeField } from 'vee-validate';
import * as Yup from 'yup';

const initForm = {
  user: {
    name: '',
    email: '',
    role: '',
    avatar: {},
    phone_number: ''
  },
  age: 18,
  youtube: '',
  address: '',
  facebook: '',
  workout_training_media: [],
  certificate: {},
  certificate_issuer: null,
  work_type: '',
  techniques: [],
  desired_salary: 100,
  introduce: '',
  gender: 'male',
  zalo: ''
};
const validationSchema = Yup.object({
  user: Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required(),
    avatar: Yup.object().required(),
    phone_number: Yup.string().required()
  }),
  age: Yup.number().required(),
  youtube: Yup.string(),
  address: Yup.string(),
  facebook: Yup.string(),
  workout_training_media: Yup.array().required(),
  certificate: Yup.object(),
  certificate_issuer: Yup.number(),
  work_type: Yup.string().required(),
  techniques: Yup.array().min(1).required(),
  desired_salary: Yup.number().required(),
  introduce: Yup.string().required(),
  gender: Yup.string(),
  zalo: Yup.string()
});
const profileForm = ref({});

const fileService = useFile();
const store = useProfileStore();
onMounted(async () => {
  await store.getProfile();
  await store.getIssuers();
  await store.getTechniques();
  profileForm.value.setValues(store.form);
});

const workTypeOptions = ['GYM', 'freelancer', 'all'];

const genderOptions = ['male', 'female'];

const handleUploadCertificate = async (event) => {
  await fileService.upload(event);
  profileForm.value.setFieldValue('certificate', fileService.file.value);
};

const handleUploadAvatar = async (event) => {
  await fileService.upload(event);
  profileForm.value.setFieldValue('user.avatar', fileService.file.value);
};
const handleUploadWorkoutMedia = async (event) => {
  event.files.forEach(async (f) => {
    await fileService.upload(f);
    profileForm.value.setFieldValue('workout_training_media', [
      ...profileForm.value.getValues().workout_training_media,
      fileService.file.value
    ]);
    // store.form.workout_training_media = [
    //   ...store.form.workout_training_media,
    //   fileService.file.value
    // ];
  });
};

const onRequest = async (values) => {
  Object.assign(store.form, values);
  await store.requestBecamePersonalTrainer();
  await store.getProfile();
  profileForm.value.setValues(store.form);
};

const onSave = async () => {
  Object.assign(store.form, profileForm.value.getValues());
  await store.updateProfile();
  await store.getProfile();
  profileForm.value.setValues(store.form);
};
const onClearCertificate = () => {
  store.form.certificate = null;
};
const onClearAvatar = () => {
  store.form.user.avatar = null;
};
const onRemoveWorkoutMedia = (index) => {
  let result = profileForm.value
    .getValues()
    .workout_training_media.filter((_, idx) => idx !== index);
  profileForm.value.setFieldValue('workout_training_media', result);
};
</script>
<template>
  <base-view title="Profile">
    <VeeForm
      v-slot="{ handleSubmit }"
      :validation-schema="validationSchema"
      :initial-values="initForm"
      ref="profileForm"
      as="div"
      class="flex flex-col gap-8"
    >
      <Toast />
      <div class="card">
        <div class="flex gap-8 mt-4">
          <VeeField name="user.avatar" v-slot="{ value, handleChange, errorMessage }">
            <div class="w-1/4 flex flex-col items-center">
              <div
                class="bg-slate-300 rounded-full w-60 h-60 flex justify-center items-center"
                v-if="store.form?.user.avatar == null"
              >
                <img src="@/assets/images/user-solid-white.svg" class="w-32 h-32" />
              </div>

              <Image alt="Image" preview class="!rounded-full" v-else>
                <template #indicatoricon>
                  <i class="pi pi-eye mr-8"></i>
                  <i class="pi pi-trash" @click.stop="onClearAvatar"></i>
                </template>
                <template #image>
                  <div class="rounded-full w-60 h-60">
                    <Avatar :image="value.url" class="!w-full !h-full" shape="circle" />
                  </div>
                </template>
                <template #preview="slotProps">
                  <img
                    :src="value.url"
                    alt="preview"
                    :style="slotProps.style"
                    @click="slotProps.onClick"
                  />
                </template>
              </Image>

              <file-upload
                mode="basic"
                auto
                :multiple="true"
                :maxFileSize="1000000"
                @uploader="handleUploadAvatar"
                custom-upload
                accept="image/*"
                class="h-10 !mt-4"
              >
              </file-upload>
            </div>
          </VeeField>
          <div class="grid grid-cols-2 gap-8 w-full h-fit">
            <VeeField as="div" name="user.email" v-slot="{ field, handleChange, errorMessage }">
              <div class="p-float-label">
                <InputText
                  id="email"
                  :model-value="field.value"
                  @update:model-value="handleChange"
                  class="w-full"
                  disabled
                />
                <label for="email">Email</label>
              </div>
              <span class="text-sm text-red-500">{{ errorMessage }}</span>
            </VeeField>
            <VeeField as="div" name="user.name" v-slot="{ field, handleChange, errorMessage }">
              <div class="p-float-label">
                <InputText
                  id="fullname"
                  :model-value="field.value"
                  @update:model-value="handleChange"
                  class="w-full"
                />
                <label for="fullname">Full name</label>
              </div>
              <span class="text-sm text-red-500">{{ errorMessage }}</span>
            </VeeField>
            <VeeField
              as="div"
              name="user.phone_number"
              v-slot="{ field, handleChange, errorMessage }"
            >
              <div class="p-float-label">
                <InputText
                  id="phonenumber"
                  :model-value="field.value"
                  @update:model-value="handleChange"
                  class="w-full"
                />
                <label for="phonenumber">Phone Number</label>
              </div>
              <span class="text-sm text-red-500">{{ errorMessage }}</span>
            </VeeField>
            <VeeField as="div" name="age" v-slot="{ field, handleChange, errorMessage }">
              <div class="p-float-label">
                <InputNumber
                  :model-value="field.value"
                  @update:model-value="handleChange"
                  inputId="age-buttons"
                  showButtons
                  class="w-full"
                />
                <label for="age">Age</label>
              </div>
              <span class="text-sm text-red-500">{{ errorMessage }}</span>
            </VeeField>
            <VeeField as="div" name="gender" v-slot="{ field, handleChange, errorMessage }">
              <div class="p-float-label">
                <Dropdown
                  :model-value="field.value"
                  @update:model-value="handleChange"
                  :options="genderOptions"
                  placeholder="Select gender"
                  class="w-full md:w-14rem"
                />
                <label for="gender">Gender</label>
              </div>
              <span class="text-sm text-red-500">{{ errorMessage }}</span>
            </VeeField>
          </div>
        </div>
        <div class="text-end mt-8">
          <Button label="Save" icon="pi pi-check" iconPos="right" @click="onSave" />
        </div>
      </div>
      <div class="card mt-8 h-fit space-y-8">
        <div class="flex items-center mb-8">
          <p class="mr-4 text-lg font-medium">Personal Trainer</p>
          <i class="pi pi-verified !text-green-500 !text-lg"></i>
        </div>
        <div class="flex gap-4">
          <VeeField name="certificate" v-slot="{ value, errorMessage }">
            <div class="w-1/3 pr-4">
              <div class="w-full h-80 bg-slate-100 mb-8">
                <Image alt="Image" preview class="w-full h-full" v-if="value?.url">
                  <template #indicatoricon>
                    <i class="pi pi-eye mr-8" @click="onClick"></i>
                    <i class="pi pi-trash" @click.stop="onClearCertificate"></i>
                  </template>
                  <template #image>
                    <img :src="value.url" alt="image" class="w-full h-full" />
                  </template>
                  <template #preview="slotProps">
                    <img
                      :src="value.url"
                      alt="preview"
                      :style="slotProps.style"
                      @click="slotProps.onClick"
                    />
                  </template>
                </Image>
              </div>
              <file-upload
                mode="basic"
                auto
                custom-upload
                :maxFileSize="1000000"
                @uploader="handleUploadCertificate"
                accept="image/*"
                choose-label="Upload certificate"
              >
              </file-upload>
            </div>
          </VeeField>
          <VeeField name="workout_training_media" v-slot="{ value, handleChange, errorMessage }">
            <div class="w-2/3">
              <div class="w-full h-80 bg-slate-100 mb-8 grid grid-cols-4 grid-rows-2 gap-4">
                <template v-if="value.length">
                  <Image
                    alt="Image"
                    preview
                    class="w-full h-full"
                    v-for="(img, index) in value"
                    :key="img"
                  >
                    <template #indicatoricon>
                      <i class="pi pi-eye mr-8"></i>
                      <i class="pi pi-trash" @click.stop="onRemoveWorkoutMedia(index)"></i>
                    </template>
                    <template #image>
                      <img :src="img.url" alt="image" class="w-full h-full" />
                    </template>
                    <template #preview="slotProps">
                      <img
                        :src="img.url"
                        alt="preview"
                        :style="slotProps.style"
                        @click="slotProps.onClick"
                      />
                    </template>
                  </Image>
                </template>
              </div>

              <file-upload
                mode="basic"
                auto
                :multiple="true"
                :maxFileSize="1000000"
                @uploader="handleUploadWorkoutMedia"
                custom-upload
                accept="image/*"
                choose-label="Upload image workout training"
              >
              </file-upload>
            </div>
          </VeeField>
        </div>
        <div class="grid grid-cols-3 gap-8">
          <VeeField
            as="div"
            name="certificate_issuer"
            v-slot="{ field, handleChange, errorMessage }"
          >
            <div class="p-float-label">
              <Dropdown
                :model-value="field.value?.id"
                @update:model-value="handleChange"
                :options="store.issuerOptions"
                optionLabel="name"
                optionValue="id"
                placeholder="Select a certificate issuer"
                class="w-full md:w-14rem"
              />
              <label for="issuer">Certificate Issuer</label>
            </div>
            <span class="text-sm text-red-500">{{ errorMessage }}</span>
          </VeeField>
          <VeeField as="div" name="work_type" v-slot="{ field, handleChange, errorMessage }">
            <div class="p-float-label">
              <Dropdown
                :model-value="field.value"
                @update:model-value="handleChange"
                :options="workTypeOptions"
                placeholder="Select work type"
                class="w-full md:w-14rem"
              />
              <label for="work_type">Type Work</label>
            </div>
            <span class="text-sm text-red-500">{{ errorMessage }}</span>
          </VeeField>
          <VeeField as="div" name="desired_salary" v-slot="{ field, handleChange, errorMessage }">
            <div class="p-inputgroup flex-1">
              <div class="p-float-label">
                <InputText
                  type="text"
                  :model-value="field.value"
                  @update:model-value="handleChange"
                />
                <label for="desired_salary">Desired Salary</label>
              </div>
              <span class="p-inputgroup-addon !w-32">
                <p>$/ 1 hour</p>
              </span>
            </div>
            <span class="text-sm text-red-500">{{ errorMessage }}</span>
          </VeeField>
          <VeeField
            as="div"
            name="techniques"
            v-slot="{ field, handleChange, errorMessage }"
            class="col-span-3"
          >
            <div class="p-float-label">
              <MultiSelect
                :model-value="field.value.map((item) => item.id)"
                @update:model-value="handleChange"
                display="chip"
                :options="store.techniqueOptions"
                optionLabel="name"
                optionValue="id"
                placeholder="Select technique"
                :maxSelectedLabels="10"
                class="w-full md:w-20rem"
              />
              <label for="techniques">Technique</label>
            </div>
            <span class="text-sm text-red-500">{{ errorMessage }}</span>
          </VeeField>
          <VeeField
            as="div"
            name="address"
            v-slot="{ field, handleChange, errorMessage }"
            class="col-span-3"
          >
            <div class="p-float-label">
              <InputText
                id="address"
                :model-value="field.value"
                @update:model-value="handleChange"
                class="w-full"
              />
              <label for="address">Home Address</label>
            </div>
            <span class="text-sm text-red-500">{{ errorMessage }}</span>
          </VeeField>
          <VeeField as="div" name="youtube" v-slot="{ field, handleChange, errorMessage }">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-youtube"></i>
              </span>
              <div class="p-float-label">
                <InputText
                  id="youtube"
                  class="!w-full"
                  :model-value="field.value"
                  @update:model-value="handleChange"
                />
                <label for="youtube">Youtube</label>
              </div>
            </div>
            <span class="text-sm text-red-500">{{ errorMessage }}</span>
          </VeeField>
          <VeeField as="div" name="facebook" v-slot="{ field, handleChange, errorMessage }">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-facebook"></i>
              </span>
              <div class="p-float-label">
                <InputText
                  id="facebook"
                  class="!w-full"
                  :model-value="field.value"
                  @update:model-value="handleChange"
                />
                <label for="facebook">Facebook</label>
              </div>
            </div>
            <span class="text-sm text-red-500">{{ errorMessage }}</span>
          </VeeField>
          <VeeField as="div" name="zalo" v-slot="{ field, handleChange, errorMessage }">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <p>Zalo</p>
              </span>
              <div class="p-float-label">
                <InputText
                  id="zalo"
                  class="!w-full"
                  :model-value="field.value"
                  @update:model-value="handleChange"
                />
                <label for="zalo">Zalo</label>
              </div>
            </div>
            <span class="text-sm text-red-500">{{ errorMessage }}</span>
          </VeeField>
          <VeeField
            as="div"
            name="introduce"
            v-slot="{ field, handleChange, errorMessage }"
            class="col-span-3"
          >
            <div class="p-float-label">
              <Textarea
                id="intro"
                :model-value="field.value"
                @update:model-value="handleChange"
                class="w-full h-full"
              />
              <label for="intro">Introduction</label>
            </div>
            <span class="text-sm text-red-500">{{ errorMessage }}</span>
          </VeeField>
          <div class="col-start-3 col-span-1 text-end">
            <Button
              label="Request"
              icon="pi pi-cloud-upload"
              icon-pos="right"
              @click="handleSubmit($event, onRequest)"
            />
          </div>
        </div>
      </div>
    </VeeForm>
  </base-view>
</template>
