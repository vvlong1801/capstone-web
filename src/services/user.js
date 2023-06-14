export const onGetUserByKeyWord = async (keyword) => {
  return await window.axios.get(`users/search/${keyword}`);
};
