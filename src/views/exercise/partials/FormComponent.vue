<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useExerciseStore } from '@/stores/exercise.js';
import { useMuscleStore } from '@/stores/muscle.js';
import { useEquipmentStore } from '@/stores/equipment.js';
import FileUpload from 'primevue/fileupload';
import SelectButton from 'primevue/selectbutton';
import AutoComplete from 'primevue/autocomplete';

import { EVALUATE_METHOD, TYPE_LEVEL, GENDER } from '@/utils/option';
import { useFile } from '@/composables/file.js';

const props = defineProps({
  type: {
    required: false,
    default: 'create'
  }
});

const exerciseStore = useExerciseStore();
const muscleStore = useMuscleStore();
const equipmentStore = useEquipmentStore();

// const typeDescOpts = ['free', 'step'];
const typeDesc = ref('free');

const filteredGroupTags = ref([]);

onMounted(async () => {
  await muscleStore.getMuscles();
  await equipmentStore.getEquipments();
  await exerciseStore.getGroupTags();
});

const fileService = useFile();

const onUpload = async (event, type) => {
  await fileService.upload(event, 'exercises', type);
  exerciseStore.form.setFieldValue(type, fileService.file.value);
};

const checkValidate = (type) => exerciseStore.form.errors[type] && exerciseStore.form.submitCount;

const searchGroupTag = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredGroupTags.value = [...exerciseStore.groupTags];
    } else {
      let filtered = exerciseStore.groupTags.filter((tag) => {
        return tag.name.toLowerCase().includes(event.query.toLowerCase());
      });
      if (filtered.length) {
        filteredGroupTags.value = [...filtered];
      } else {
        filteredGroupTags.value = [{ id: null, name: event.query }];
      }
    }
  }, 250);
};
</script>
<template>
  <div class="flex flex-col gap-6">
    <div class="card p-8 flex gap-8 w-full">
      <div class="grid grid-cols-2 auto-rows-max gap-6 w-1/2">
        <div class="col-span-2">
          <div class="p-float-label">
            <InputText
              id="name"
              :model-value="exerciseStore.form.values.name"
              @update:model-value="(value) => exerciseStore.form.setFieldValue('name', value)"
              class="w-full"
              inputId="name"
            />
            <label for="name">Name</label>
          </div>
          <small class="p-error" id="text-error" v-if="checkValidate('name')">
            {{ exerciseStore.form.errors.name || '&nbsp;' }}
          </small>
        </div>
        <div>
          <SelectButton
            :model-value="exerciseStore.form.values.level"
            @update:model-value="(value) => exerciseStore.form.setFieldValue('level', value)"
            dataKey="value"
            optionValue="value"
            :options="TYPE_LEVEL"
            aria-labelledby="multiple"
            class="grid grid-cols-3"
          >
            <template #option="slotProps">
              <div class="flex items-center justify-center w-full">
                <p class="capitalize">{{ slotProps.option.label }}</p>
              </div>
            </template>
          </SelectButton>
          <small class="p-error" id="text-error" v-if="checkValidate('level')">
            {{ exerciseStore.form.errors.level || '&nbsp;' }}
          </small>
        </div>

        <div>
          <SelectButton
            :model-value="exerciseStore.form.values.for_gender"
            @update:model-value="(value) => exerciseStore.form.setFieldValue('for_gender', value)"
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
          <small class="p-error" id="text-error" v-if="checkValidate('level')">
            {{ exerciseStore.form.errors.level || '&nbsp;' }}
          </small>
        </div>

        <div class="col-span-2 flex gap-6">
          <div class="flex-1">
            <SelectButton
              :model-value="exerciseStore.form.values.requirement_unit"
              @update:model-value="
                (value) => exerciseStore.form.setFieldValue('requirement_unit', value)
              "
              :options="EVALUATE_METHOD"
              optionValue="value"
              aria-labelledby="multiple"
              class="grid grid-cols-2"
            >
              <template #option="slotProps">
                <div class="flex items-center justify-center w-full">
                  <i class="mr-2" :class="`pi ${slotProps.option.icon}`" />
                  <p class="capitalize">{{ slotProps.option.label }}</p>
                </div>
              </template>
            </SelectButton>
            <small class="p-error" id="text-error" v-if="checkValidate('requirement_unit')">
              {{ exerciseStore.form.errors.requirement_unit || '&nbsp;' }}
            </small>
          </div>
          <div class="flex-1">
            <div class="p-inputgroup flex-1">
              <div class="p-float-label">
                <InputText
                  id="requirement_initial"
                  :model-value="exerciseStore.form.values.requirement_initial"
                  @update:model-value="
                    (value) => exerciseStore.form.setFieldValue('requirement_initial', value)
                  "
                  class="w-full"
                  inputId="requirement_initial"
                />
                <label for="requirement_initial">Init value for type</label>
              </div>
              <span class="p-inputgroup-addon">{{
                exerciseStore.form.values.requirement_unit
              }}</span>
            </div>
            <small class="p-error" id="text-error" v-if="checkValidate('requirement_initial')">
              {{ exerciseStore.form.errors.requirement_initial || '&nbsp;' }}
            </small>
          </div>
        </div>

        <div class="flex-col">
          <div class="p-float-label">
            <MultiSelect
              class="w-full"
              :options="muscleStore.muscles"
              :loading="muscleStore.muscles === null"
              optionLabel="name"
              :model-value="exerciseStore.form.values.muscles"
              @update:model-value="(value) => exerciseStore.form.setFieldValue('muscles', value)"
              display="chip"
              inputId="muscles"
            >
              <template #option="slotProps">
                <div class="flex justify-between w-full items-center">
                  <p class="capitalize">{{ slotProps.option.name }}</p>
                  <img
                    :alt="slotProps.option.name"
                    :src="slotProps.option.image.url"
                    class="mr-2 w-8"
                  />
                </div>
              </template>
              <template #footer>
                <div class="py-2 px-3">
                  <b>{{
                    exerciseStore.form.values.muscles ? exerciseStore.form.values.muscles.length : 0
                  }}</b>
                  item{{
                    (exerciseStore.form.values.muscles
                      ? exerciseStore.form.values.muscles.length
                      : 0) > 1
                      ? 's'
                      : ''
                  }}
                  selected.
                </div>
              </template>
            </MultiSelect>
            <label for="muscles" class="truncate max-w-full pr-8"> Select muscles </label>
          </div>
          <small class="p-error" id="text-error" v-if="checkValidate('muscles')">
            {{ exerciseStore.form.errors.muscles || '&nbsp;' }}
          </small>
        </div>
        <div class="flex-col">
          <div class="p-float-label">
            <Dropdown
              class="w-full"
              :options="equipmentStore.equipments"
              optionLabel="name"
              :model-value="exerciseStore.form.values.equipment"
              @update:model-value="(value) => exerciseStore.form.setFieldValue('equipment', value)"
              :loading="equipmentStore.equipments === null"
              inputId="equipment"
            >
              <template #option="slotProps">
                <div class="flex items-center justify-between">
                  <p class="capitalize">{{ slotProps.option.name }}</p>
                  <img
                    :alt="slotProps.option.name"
                    :src="slotProps.option.image.url"
                    class="mr-2 w-8"
                  />
                </div>
              </template>
            </Dropdown>
            <label for="equipment" class="truncate max-w-full pr-8"> Select equipment </label>
          </div>
        </div>
        <div class="p-float-label col-span-2">
          <AutoComplete
            :model-value="exerciseStore.form.values.group_tags"
            @update:model-value="(value) => exerciseStore.form.setFieldValue('group_tags', value)"
            multiple
            :suggestions="filteredGroupTags"
            optionLabel="name"
            class="!block"
            inputId="group"
            @complete="searchGroupTag"
          />
          <label for="group" class="truncate max-w-full pr-8"> Select group </label>
        </div>
        <small class="p-error" id="text-error" v-if="checkValidate('group_tags')">
          {{ exerciseStore.form.errors.group_tags || '&nbsp;' }}
        </small>
        <div class="col-span-2">
          <FileUpload
            name="gif"
            accept="image/*"
            :maxFileSize="3000000"
            @uploader="onUpload($event, 'gif')"
            auto
            custom-upload
            class="w-1/2 flex-auto"
          >
            <template #header="{ chooseCallback }">
              <div class="flex space-x-4 items-center justify-between w-full">
                <Button @click="chooseCallback" icon="pi pi-cloud-upload" />
                <Badge :value="exerciseStore.form.values.gif?.filename ?? 'gif'" class="p-2" />
              </div>
            </template>
            <template #content>
              <Image
                v-if="exerciseStore.form.values.gif"
                :src="exerciseStore.form.values.gif?.url"
                :alt="exerciseStore.form.values.gif?.name"
                class="w-full flex justify-center items-center"
              />
              <div v-else>
                <p>Drag and drop files to here to upload.</p>
              </div>
            </template>
          </FileUpload>
          <small class="p-error" id="text-error" v-if="checkValidate('gif')">{{
            exerciseStore.form.errors.gif || '&nbsp;'
          }}</small>
        </div>
        <div class="col-span-2">
          <FileUpload
            name="image"
            accept="image/*"
            :maxFileSize="1000000"
            @uploader="onUpload($event, 'image')"
            auto
            custom-upload
            class="!w-1/2 !flex-auto"
          >
            <template #header="{ chooseCallback }">
              <div class="flex space-x-4 items-center justify-between w-full">
                <Button @click="chooseCallback" icon="pi pi-cloud-upload" />
                <Badge :value="exerciseStore.form.values.image?.filename ?? 'image'" class="p-2" />
              </div>
            </template>
            <template #content>
              <Image
                v-if="exerciseStore.form.values.image"
                :src="exerciseStore.form.values.image?.url"
                :alt="exerciseStore.form.values.image?.name"
                class="w-full flex justify-center items-center"
              />
              <div v-else>
                <p>Drag and drop files to here to upload.</p>
              </div>
            </template>
          </FileUpload>
          <small class="p-error" id="text-error" v-if="checkValidate('image')">{{
            exerciseStore.form.errors.image || '&nbsp;'
          }}</small>
        </div>
        <div class="col-span-2">
          <div class="p-inputgroup">
            <div class="p-float-label">
              <InputText
                class="w-full"
                placeholder="enter video url"
                :model-value="exerciseStore.form.values.youtube_url"
                @update:model-value="
                  (value) => exerciseStore.form.setFieldValue('youtube_url', value)
                "
                inputId="video"
              />
              <label for="video">Youtube url</label>
            </div>
            <span class="p-inputgroup-addon">
              <i class="pi pi-youtube"></i>
            </span>
          </div>
          <small class="p-error" id="text-error" v-if="checkValidate('youtube_url')">{{
            exerciseStore.form.errors.youtube_url || '&nbsp;'
          }}</small>
        </div>
      </div>
      <div class="flex flex-col w-1/2 gap-6">
        <!-- <SelectButton
          v-model="typeDesc"
          :options="typeDescOpts"
          aria-labelledby="basic"
          class="grid grid-cols-2"
        /> -->
        <span class="p-float-label" v-if="typeDesc == 'free'">
          <Textarea
            :model-value="exerciseStore.form.values.description"
            @update:model-value="(value) => exerciseStore.form.setFieldValue('description', value)"
            rows="32"
            class="w-full"
            autoResize
            inputId="description"
          />
          <label for="description">Description</label>
        </span>
      </div>
    </div>
    <div class="flex justify-between">
      <Button
        label="Back"
        class="!rounded-lg drop-shadow-lg"
        @click="$router.push({ name: 'exercise.index' })"
      />
      <Button
        :label="props.type == 'edit' ? 'Update' : 'Create'"
        class="!rounded-lg drop-shadow-lg"
        @click="$emit('handleSubmit')"
      />
    </div>
  </div>
</template>
