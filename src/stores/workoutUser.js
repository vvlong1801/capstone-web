import { defineStore } from 'pinia';
import { ref} from 'vue';
import { WorkoutUserAPI } from '@/services';
import { useToast } from 'primevue/usetoast';

export const useWorkoutUserStore = defineStore('workoutUser', () => {
  const workoutUsers = ref([]);
  const detailWorkoutUser = ref();

  const getWorkoutUsers = async () => {
    try {
      let res = await WorkoutUserAPI.onGetWorkoutUsers();
      workoutUsers.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getWorkoutUserById = async (id) => {
    try {
        let res = await WorkoutUserAPI.onGetWorkoutUserById(id);
        detailWorkoutUser.value = res.data;
      } catch (error) {
        console.log(error);
      }
  }

  return {
    workoutUsers,
    detailWorkoutUser,
    getWorkoutUsers,
    getWorkoutUserById,
  };
});
