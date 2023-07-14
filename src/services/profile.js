export const onGetProfile = async () => {
  return await window.axios.get(`profile`);
};

export const onGetIssuers = async () => {
  return await window.axios.get('certificate-issuers');
};

export const onGetTechniques = async () => {
  return await window.axios.get('techniques');
};

export const onUpdateProfile = async (payload) => {
  return await window.axios.post(`profile`, payload);
};
export const onRequestBecamePersonalTrainer = async (payload) => {
  return await window.axios.post(`request-became-pt`, payload);
};
