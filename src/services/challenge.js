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
  
  export const onUpdateBasicInformation = async (id, data) => {
    return await window.axios.put(`challenges/${id}/information`, data);
  };

  export const onApproveChallenge = async (id, data) => {
    return await window.axios.put(`challenges/${id}/confirm`, data);
  };
  
  export const onDeleteChallenge = async (id) => {
    return await window.axios.delete(`challenges/${id}`);
  };

  // detail
  export const fetchChallengeFeedbacks = async () => {
    // return await window.axios.delete(`challenges/${id}/feedback`);
    return [
      { id: 1, image: '', name: 'longvv', feedback: 'So good', createdAt: new Date(Date.now()).toLocaleString()},
      { id: 2, image: '', name: 'long2', feedback: 'Perfect! I want to learn more', createdAt: new Date(Date.now()).toLocaleString()},
    ]
  };
  