import { defineStore } from 'pinia';
import { ref} from 'vue';
import { MemberAPI } from '@/services';

export const useMemberStore = defineStore('member', () => {
  const members = ref([]);
  const detailMember = ref();

  const getMembers = async () => {
    try {
      let res = await MemberAPI.onGetMembers();
      console.log(res);
      members.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getMemberById = async (id) => {
    try {
        let res = await MemberAPI.onGetMemberById(id);
        detailMember.value = res.data;
      } catch (error) {
        console.log(error);
      }
  }

  return {
    members,
    detailMember,
    getMembers,
    getMemberById
  };
});
