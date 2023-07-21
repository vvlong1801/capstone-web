<script setup>
import BaseView from '@/views/BaseView.vue';
import Button from 'primevue/button';
import Chips from 'primevue/chips';
import Avatar from 'primevue/avatar';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCreatorStore } from '@/stores/creator';

const store = useCreatorStore();

const requestData = ref({ user: { email: '', name: '', phone_number: '' } });
const route = useRoute();
const router = useRouter();

const workTypeOptions = ['GYM', 'freelancer'];

const genderOptions = ['male', 'female'];

onMounted(async () => {
  requestData.value = await store.getPersonalTrainerRequestById(route.params.id);
});

const onAccept = async () => {
  await store.verifyPersonalTrainer(route.params.id, true);
  router.push('/creators');
}

const onUnAccept = async () => {
  await store.verifyPersonalTrainer(route.params.id, false);
  router.push('/creators');
}

</script>
<template>
  <base-view title="Detail Personal Trainer">
    <div class="card">
      <div class="flex gap-8 mt-4">
        <div class="w-1/4 flex flex-col items-center gap-8">
          <div
            class="bg-slate-300 rounded-full w-60 h-60 flex justify-center items-center"
            v-if="requestData?.user?.avatar == null"
          >
            <img src="@/assets/images/user-solid-white.svg" class="w-32 h-32" />
          </div>
          <Image alt="Image" preview class="!rounded-full" v-else>
            <template #image>
              <div class="rounded-full w-60 h-60">
                <Avatar
                  :image="requestData.user.avatar.url"
                  class="!w-full !h-full"
                  shape="circle"
                />
              </div>
            </template>
            <template #preview="slotProps">
              <img
                :src="requestData.user.avatar.url"
                alt="preview"
                :style="slotProps.style"
                @click="slotProps.onClick"
              />
            </template>
          </Image>
          <div class="w-full h-60 bg-slate-100">
            <Image alt="Image" preview class="w-full h-full" v-if="requestData?.certificate">
              <template #image>
                <img :src="requestData.certificate.url" alt="image" class="w-full h-full" />
              </template>
              <template #preview="slotProps">
                <img
                  :src="requestData.certificate.url"
                  alt="preview"
                  :style="slotProps.style"
                  @click="slotProps.onClick"
                />
              </template>
            </Image>
          </div>
          <div class="w-full min-h-[15rem] bg-slate-100 mb-8 grid grid-cols-4 grid-rows-2 gap-4">
            <template v-if="requestData?.workoutTrainingMedia?.length">
              <Image
                alt="Image"
                preview
                class="w-full h-full"
                v-for="(img, index) in requestData.workoutTrainingMedia"
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
            <InputText id="email" v-model="requestData.user.email" class="w-full" disabled />
            <label for="email">Email</label>
          </div>
          <div class="p-float-label">
            <InputText id="fullname" v-model="requestData.user.name" class="w-full" disabled />
            <label for="fullname">Full name</label>
          </div>
          <div class="p-float-label">
            <InputText
              id="phone_number"
              v-model="requestData.user.phone_number"
              class="w-full"
              disabled
            />
            <label for="phone_number">Phone Number</label>
          </div>
          <div class="p-float-label">
            <InputText id="age" v-model="requestData.age" class="w-full" disabled />
            <label for="age">Age</label>
          </div>
          <div class="p-float-label">
            <Dropdown
              v-model="requestData.gender"
              :options="genderOptions"
              placeholder="Select gender"
              class="w-full md:w-14rem"
              disabled
            />
            <label for="gender">Gender</label>
          </div>
          <div class="p-float-label">
            <InputText
              id="certificate_issuer"
              v-model="requestData.certificate_issuer.name"
              class="w-full"
              disabled
              v-if="requestData.certificate_issuer"
            />
            <label for="certificate_issuer">Certificate Issuer</label>
          </div>
          <div class="p-float-label">
            <Dropdown
              v-model="requestData.work_type"
              :options="workTypeOptions"
              placeholder="Select a City"
              class="w-full md:w-14rem"
              disabled
            />
            <label for="work_type">Work Type</label>
          </div>
          <div class="p-inputgroup flex-1">
            <div class="p-float-label">
              <InputText type="text" v-model="requestData.desired_salary" disabled />
              <label for="salary">Desired Salary</label>
            </div>
            <span class="p-inputgroup-addon !w-32">
              <p>$/ 1 hour</p>
            </span>
          </div>
          <div class="p-float-label col-span-2">
            <Chips
              class="!w-full"
              :model-value="requestData?.techniques?.map((te) => te.name)"
              disabled
            ></Chips>
            <label for="techniques">Techniques</label>
          </div>
          <div class="p-float-label col-span-2">
            <InputText id="address" v-model="requestData.address" class="w-full" disabled />
            <label for="address">Home Address</label>
          </div>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-youtube"></i>
            </span>
            <div class="p-float-label">
              <InputText id="youtube" class="!w-full" v-model="requestData.youtube" disabled />
              <label for="youtube">Youtube</label>
            </div>
          </div>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-facebook"></i>
            </span>
            <div class="p-float-label">
              <InputText id="facebook" class="!w-full" v-model="requestData.facebook" disabled />
              <label for="facebook">Facebook</label>
            </div>
          </div>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <p>Zalo</p>
            </span>
            <div class="p-float-label">
              <InputText id="zalo" class="!w-full" v-model="requestData.zalo" disabled />
              <label for="zalo">Zalo</label>
            </div>
          </div>
          <div class="p-float-label col-span-2 row-span-3">
            <Textarea id="intro" v-model="requestData.introduce" class="w-full h-full" disabled />
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
          @click="$router.push('/creators')"
        />
        <div class="flex">
          <Button
            label="UnAccept"
            icon="pi pi-times"
            iconPos="right"
            severity="warning"
            class="!mr-8"
            @click="onUnAccept"
          />
          <Button
            label="Accept"
            icon="pi pi-check"
            iconPos="right"
            severity="success"
            @click="onAccept"
          />
        </div>
      </div>
    </div>
  </base-view>
</template>
