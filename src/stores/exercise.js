import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { TYPE_LEVEL, EVALUATE_METHOD, getOption } from '@/utils/option';
import { ExerciseAPI } from '@/services';

export const useExerciseStore = defineStore('exercise', () => {
  const router = useRouter();
  const exercises = ref([]);
  const pagination = ref({});
  const filtered = ref([]);
  const selectedExercises = ref([]);
  const toast = useToast();
  const editItem = ref({});
  const groupTags = ref([]);

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    level: Yup.string().required(),
    requirement_unit: Yup.string().required(),
    requirement_initial: Yup.string().required(),
    group_tags: Yup.array(),
    muscles: Yup.array().required(),
    image: Yup.object().required(),
    gif: Yup.object().required()
  });

  const initialValues = {
    name: '',
    level: TYPE_LEVEL[0].value,
    type: null,
    requirement_unit: EVALUATE_METHOD[0].value,
    requirement_initial: '',
    group_tags: null,
    equipment: null,
    description: '',
    muscles: null,
    gif: null,
    video: null,
    image: null
  };

  const form = useForm({
    initialValues,
    validationSchema
  });

  const resetSelected = () => (selectedExercises.value = []);
  const resetEditItem = () => (editItem.value = {});

  const showToast = (type = 'success', title = 'Success', content = '') => {
    toast.add({
      severity: type,
      summary: title,
      detail: content,
      life: 3000
    });
  };

  const convertResToData = (res) => {
    if (res instanceof Array) {
      const result = res.map((item) => {
        item.requirement_unit = getOption(EVALUATE_METHOD, item.requirement_unit);
        item.level = getOption(TYPE_LEVEL, item.level);
        return item;
      });
      return result;
    } else {
      res.requirement_unit = getOption(EVALUATE_METHOD, res.requirement_unit);
      res.level = getOption(TYPE_LEVEL, res.level);
      return res;
    }
  };

  const getExercises = async () => {
    try {
      const res = await ExerciseAPI.onGetExercises();
      exercises.value = convertResToData(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getGroupTags = async () => {
    try {
      const res = await ExerciseAPI.onGetGroupTags();
      groupTags.value = res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getExerciseById = async (id) => {
    try {
      const res = await ExerciseAPI.onGetExerciseById(id);
      // editItem.value = convertResToData(res?.data);
      editItem.value = res.data;
    } catch (error) {
      showToast('error', error.response.data.message);
    }
  };

  const createExercise = form.handleSubmit(async (values, { resetForm }) => {
    values.muscles = values.muscles.map((item) => item.id);
    values.equipment = values.equipment?.id ?? null;

    await window.axios
      .post('exercises', values)
      .then((res) => {
        showToast('success', res.message);
        router.push({ name: 'exercise.index' });
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const editExercise = form.handleSubmit(async (values, { setErrors, resetForm }) => {
    values.muscles = values.muscles.map((item) => item.id);
    values.equipment = values.equipment.id;
    try {
      const res = await ExerciseAPI.onEditExercise(values.id, values);
      showToast('success', res.message);
      router.push({ name: 'exercise.index' });
      resetEditItem();
      resetForm();
    } catch (error) {
      setErrors(error.response.data);
      showToast('error', error.response.data.message);
    }
  });

  const deleteExercise = async (id) => {
    try {
      const res = await ExerciseAPI.onDeleteExercise(id);
      showToast('success', res?.message);
      getExercises();
    } catch (error) {
      showToast('error', error.response.data.message);
    } finally {
      resetSelected();
    }
  };

  return {
    exercises,
    groupTags,
    pagination,
    selectedExercises,
    form,
    resetSelected,
    filtered,
    getExercises,
    getGroupTags,
    getExerciseById,
    editItem,
    createExercise,
    editExercise,
    deleteExercise
  };
});
