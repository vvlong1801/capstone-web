export const onGetWorkoutUsers = async () => {
  return await window.axios.get('workout-users');
};

export const onGetWorkoutUserById = async (id) => {
  return await window.axios.get(`workout-users/${id}`);
};
