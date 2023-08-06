export const onGetMembers = async () => {
  return await window.axios.get('challenge-members');
};

export const onGetMemberById = async (id) => {
  return await window.axios.get(`challenge-members/${id}`);
};

export const onApproveMember = async (memberId) => {
  return await window.axios.get(`challenge-members/${memberId}/approve`);
};

