import { defineStore } from 'pinia';
import { ref} from 'vue';
import { MemberAPI } from '@/services';
import { useToast } from 'primevue/usetoast';

export const useMemberStore = defineStore('member', () => {
  const members = ref([]);
  const detailMember = ref();
  const toast = useToast();

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

  const approveMember = async (memberId) => {
    try {
      let res = await MemberAPI.onApproveMember(memberId);
      toast.add({
        severity: "success",
        summary: "Success",
        detail: res.message,
        life: 3000
      });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    members,
    detailMember,
    getMembers,
    getMemberById,
    approveMember,
  };
});
