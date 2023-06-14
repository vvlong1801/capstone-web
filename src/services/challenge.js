export const onGetChallenges = async () => {
    return await window.axios.get('challenges');
  };
  
  export const onGetChallengeTags = async () => {
    return await window.axios.get('challenges/tags');
  };
  
//   export const onGetExercisesWithPagination = async (pageNum = 1) => {
//     return await window.axios.get(`exercises/12?page=${pageNum}`);
//   };
  
  export const onGetChallengeById = async (id) => {
    return await window.axios.get(`challenges/${id}`);
  };
  
  export const onCreateChallenge = async (data) => {
    return await window.axios.post('challenges', data);
  };
  
//   export const onEditExercise = async (id, data) => {
//     return await window.axios.put(`exercises/${id}`, data);
//   };
  
  export const onDeleteChallenge = async (id) => {
    return await window.axios.delete(`challenges/${id}`);
  };
  