<script setup>
import BaseView from '@/views/BaseView.vue';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import Calendar from 'primevue/calendar';
import Avatar from 'primevue/avatar';
import { ref } from 'vue';
import { useFile } from '@/composables/file.js';

const fileService = useFile();

const profile = ref({
  name: 'creator A',
  email: 'creatorA@gmail.com',
  phoneNumber: '0987654321',
  dataOfBirth: '0987654321',
  youtube: '',
  address: '',
  facebook: '',
  avatar: null,
  workoutTrainingMedia: [],
  certificate: null,
  certificateIssuer: '',
  workType: '',
  techniques: [],
  price: 10,
  intro: '',
  gender: '',
  zalo: ''
});

const certIssuers = [
  'American Council on Exercise (ACE)',
  'National Academy of Sports Medicine (NASM)',
  'American College of Sports Medicine (ACSM)',
  'National Strength and Conditioning Association (NSCA)',
  'Hiệp hội PT Việt Nam (VPTA)',
  'Viện Thể dục thể thao Việt Nam (VAFS)'
];

const workTypeOptions = ['GYM', 'freelancer'];

const techniqueOptions = ['Yoga', 'Pilates', 'Điều trị thể lực', 'GYM', 'cardio', 'kickboxing'];
const genderOptions = ['male', 'female'];

const handleUploadCertificate = async (event) => {
  await fileService.upload(event);
  profile.value.certificate = fileService.file.value;
};

const handleUploadAvatar = async (event) => {
  await fileService.upload(event);
  profile.value.avatar = fileService.file.value;
};
const handleUploadWorkoutMedia = async (event) => {
  event.files.forEach(async (f) => {
    await fileService.upload(f);
    profile.value.workoutTrainingMedia = [
      ...profile.value.workoutTrainingMedia,
      fileService.file.value
    ];
  });
};

const onClick = () => {
  console.log('click');
};
const onClearCertificate = () => {
  profile.value.certificate = null;
};
const onClearAvatar = () => {
  profile.value.avatar = null;
};
const onRemoveWorkoutMedia = (index) => {
  profile.value.workoutTrainingMedia = profile.value.workoutTrainingMedia.filter(
    (_, idx) => idx !== index
  );
};
</script>
<template>
  <base-view title="Detail Personal Trainer">
    <div class="card">
      <div class="flex gap-8 mt-4">
        <div class="w-1/4 flex flex-col items-center gap-8">
          <div
            class="bg-slate-300 rounded-full w-60 h-60 flex justify-center items-center"
            v-if="profile.avatar == null"
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
                <Avatar :image="profile.avatar.url" class="!w-full !h-full" shape="circle" />
              </div>
            </template>
            <template #preview="slotProps">
              <img
                :src="profile.avatar.url"
                alt="preview"
                :style="slotProps.style"
                @click="slotProps.onClick"
              />
            </template>
          </Image>
          <div class="w-full h-60 bg-slate-100">
            <Image alt="Image" preview class="w-full h-full" v-if="profile.certificate">
              <template #indicatoricon>
                <i class="pi pi-eye mr-8" @click="onClick"></i>
                <i class="pi pi-trash" @click.stop="onClearCertificate"></i>
              </template>
              <template #image>
                <img :src="profile.certificate.url" alt="image" class="w-full h-full" />
              </template>
              <template #preview="slotProps">
                <img
                  :src="profile.certificate.url"
                  alt="preview"
                  :style="slotProps.style"
                  @click="slotProps.onClick"
                />
              </template>
            </Image>
          </div>
          <div class="w-full min-h-[15rem] bg-slate-100 mb-8 grid grid-cols-4 grid-rows-2 gap-4">
            <template v-if="profile.workoutTrainingMedia.length">
              <Image
                alt="Image"
                preview
                class="w-full h-full"
                v-for="(img, index) in profile.workoutTrainingMedia"
                :key="img"
              >
                <template #indicatoricon>
                  <i class="pi pi-eye mr-8"></i>
                  <i class="pi pi-trash" @click.stop="onRemoveWorkoutMedia(index)"></i>
                </template>
                <template #image>
                  <img :src="img.url" alt="image" class="w-full h-60" />
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
        </div>
        <div class="grid grid-cols-2 gap-8 w-full h-fit">
          <div class="p-float-label">
            <InputText id="email" v-model="profile.email" class="w-full" disabled />
            <label for="email">Email</label>
          </div>
          <div class="p-float-label">
            <InputText id="fullname" v-model="profile.name" class="w-full" disabled />
            <label for="fullname">Full name</label>
          </div>
          <div class="p-float-label">
            <InputText id="phonenumber" v-model="profile.phoneNumber" class="w-full" disabled />
            <label for="phonenumber">Phone Number</label>
          </div>
          <div class="p-float-label">
            <Calendar v-model="profile.dataOfBirth" showIcon class="w-full" disabled />
            <label for="dateOfBirth">Date of birth</label>
          </div>
          <div class="p-float-label">
            <Dropdown
              v-model="profile.gender"
              :options="genderOptions"
              placeholder="Select gender"
              class="w-full md:w-14rem"
              disabled
            />
            <label for="gender">Gender</label>
          </div>
          <div class="p-float-label">
            <Dropdown
              v-model="profile.certificateIssuer"
              :options="certIssuers"
              placeholder="Select a City"
              class="w-full md:w-14rem"
              disabled
            />
            <label for="fullname">Certificate Issuer</label>
          </div>
          <div class="p-float-label">
            <Dropdown
              v-model="profile.workType"
              :options="workTypeOptions"
              placeholder="Select a City"
              class="w-full md:w-14rem"
              disabled
            />
            <label for="fullname">Type Work</label>
          </div>
          <div class="p-inputgroup flex-1">
            <div class="p-float-label">
              <InputText type="text" v-model="profile.price" disabled />
              <label for="fullname">Price</label>
            </div>
            <span class="p-inputgroup-addon !w-32">
              <p>$/ 1 hour</p>
            </span>
          </div>
          <div class="p-float-label col-span-2">
            <MultiSelect
              v-model="profile.techniques"
              display="chip"
              :options="techniqueOptions"
              placeholder="Select Cities"
              :maxSelectedLabels="10"
              class="w-full md:w-20rem"
              disabled
            />
            <label for="fullname">Technique</label>
          </div>
          <div class="p-float-label col-span-2">
            <InputText id="address" v-model="profile.address" class="w-full" disabled />
            <label for="address">Home Address</label>
          </div>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-youtube"></i>
            </span>
            <div class="p-float-label">
              <InputText id="youtube" class="!w-full" v-model="profile.youtube" disabled />
              <label for="youtube">Youtube</label>
            </div>
          </div>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-facebook"></i>
            </span>
            <div class="p-float-label">
              <InputText id="facebook" class="!w-full" v-model="profile.facebook" disabled />
              <label for="facebook">Facebook</label>
            </div>
          </div>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <p>Zalo</p>
            </span>
            <div class="p-float-label">
              <InputText id="zalo" class="!w-full" v-model="profile.zalo" disabled />
              <label for="zalo">Zalo</label>
            </div>
          </div>
          <div class="p-float-label col-span-2 row-span-3">
            <Textarea id="intro" v-model="profile.intro" class="w-full h-full" disabled />
            <label for="intro">Introduction</label>
          </div>
        </div>
      </div>
      <div class="flex justify-between mt-8">
        <Button
          label="Back"
          icon="pi pi-arrow-left"
          severity="primary"
          class="!mr-8"
          @click="$router.push('/personal-trainers')"
        />
        <div class="flex">
          <Button
            label="Unaccept"
            icon="pi pi-times"
            iconPos="right"
            severity="warning"
            class="!mr-8"
          />
          <Button label="Accept" icon="pi pi-check" iconPos="right" severity="success" />
        </div>
      </div>
    </div>
  </base-view>
</template>
