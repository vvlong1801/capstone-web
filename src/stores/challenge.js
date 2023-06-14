import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { ChallengeAPI } from '@/services';

export const useChallengeStore = defineStore('challenge', () => {
  const router = useRouter();
  const toast = useToast();

  const challenges = ref([]);
  const detailChallenge = ref({ information: {}, template: {} });
  const challengeTypes = ref([]);
  const filtered = ref([]);
  const challengeTags = ref([]);

  const form = useStorage('challenge-form', {});

  const getChallenges = () => {
    return window.axios
      .get('challenges')
      .then((res) => {
        challenges.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getChallengeById = async (id) => {
    try {
      const res = await ChallengeAPI.onGetChallengeById(id);
      detailChallenge.value = res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getChallengeTags = async () => {
    try {
      const res = await ChallengeAPI.onGetChallengeTags();
      challengeTags.value = res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const createChallenge = async () => {
    let formValue = JSON.parse(JSON.stringify(form.value));

    formValue.invitation = formValue.invitation.map((item) => ({
      user_id: item.id,
      role: item.role
    }));
    formValue.template.phases.forEach((phase) => {
      phase.sessions.forEach((session) => {
        session.exercises = session.exercises.map((exe) => ({
          exercise_id: exe.id,
          requirement: exe.requirement,
          requirement_unit: exe.requirement_unit.value
        }));
      });
    });

    try {
      const res = await ChallengeAPI.onCreateChallenge(formValue);
      console.log(res?.status === 204);
      if (res?.status === 204 || res?.status === 200) {
        toast.add({ severity: 'success', summary: 'success', detail: res?.message, life: 3000 });
        setTimeout(() => {
          form.value = {};
          router.push({ name: 'challenges.index' });
        }, 1000);
      } else throw new Error(res?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBasicInfo = async (id, data) => {
    try {
      const res = await ChallengeAPI.onUpdateBasicInformation(id, data);
      console.log(res);
      if (res?.status === 204 || res?.status === 200) {
        toast.add({ severity: 'success', summary: 'success', detail: res?.message, life: 3000 });
        setTimeout(() => {
          form.value = {};
        }, 1000);
      } else {
        throw Error("server doesn't response");
      }
    } catch (error) {
      console.log(error);
      toast.add({ severity: 'error', summary: 'error', detail: error?.message, life: 3000 });
    }
  };

  const approveChallenge = async (id, data) => {
    try {
      const res = await ChallengeAPI.onApproveChallenge(id, data);
      if (res?.status === 204 || res?.status === 200) {
        toast.add({ severity: 'success', summary: 'success', detail: res?.message, life: 3000 });
        setTimeout(() => {
          form.value = {};
        }, 1000);
      } else {
        throw Error("server doesn't response");
      }
    } catch (error) {
      console.log(error);
      toast.add({ severity: 'error', summary: 'error', detail: error?.message, life: 3000 });
    }
  };

  const deleteChallenge = async (id) => {
    try {
      console.log(id);
      const res = await ChallengeAPI.onDeleteChallenge(id);
      toast.add({ severity: 'success', summary: 'success', detail: res?.message, life: 3000 });
      getChallenges();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    challenges,
    challengeTypes,
    challengeTags,
    detailChallenge,
    getChallengeById,
    getChallengeTags,
    form,
    filtered,
    getChallenges,
    createChallenge,
    updateBasicInfo,
    approveChallenge,
    deleteChallenge
  };
});
