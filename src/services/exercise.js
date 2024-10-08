export const onGetExercises = async () => {
  return await window.axios.get('exercises');
};

// export const onGetGroupTags = async () => {
//   return await window.axios.get('exercises/group_tags');
// };
export const onGetGroupTags = async () => {
  return await window.axios.get('tags/exercises');
};

export const onGetExercisesWithPagination = async (pageNum = 1) => {
  return await window.axios.get(`exercises/12?page=${pageNum}`);
};

export const onGetExerciseById = async (id) => {
  return await window.axios.get(`exercises/${id}`);
};

export const onCreateExercise = async (data) => {
  return await window.axios.post('exercises', data);
};

export const onEditExercise = async (id, data) => {
  return await window.axios.put(`exercises/${id}`, data);
};

export const onDeleteExercise = async (id) => {
  return await window.axios.delete(`exercises/${id}`);
};
