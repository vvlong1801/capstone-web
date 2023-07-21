export const onGetCreators = async () => {
  return await window.axios.get('creators');
};

export const onGetPersonalTrainers = async () => {
  return await window.axios.get('creators/pts');
};

export const onGetPersonalTrainerRequests = async () => {
  return await window.axios.get('creators/request-pt');
};
export const onGetPersonalTrainerRequestById = async (id) => {
  return await window.axios.get(`creators/request-pt/${id}`);
};

export const onGetPersonalTrainerById = async (id) => {
  return await window.axios.get(`creators/pts/${id}`);
};

export const onGetCreatorById = async (id) => {
  return await window.axios.get(`creators/${id}`);
};

export const onCreateCreator = async (data) => {
  return await window.axios.post('creators', data);
};

export const onEditCreator = async (id, data) => {
  return await window.axios.put(`creators/${id}`, data);
};

export const onDeleteCreator = async (id) => {
  return await window.axios.delete(`creators/${id}`);
};

export const onVerifyPersonalTrainer = async (id, data) => {
  return await window.axios.put(`creators/request-pt/${id}/verify`, data);
}