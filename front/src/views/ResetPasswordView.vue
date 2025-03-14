<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiService from '@/services/apiService';
import { useUtilsStore } from '@/stores/UtilsStore';
import BaseInput from '@/components/base/BaseInput.vue';

const newPassword = ref<string>('');
const confirmPassword = ref<string>('');
const route = useRoute();
const router = useRouter();
const token = route.params.token;

const showToast = useUtilsStore().showToast;

const resetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }
  try {
    const response = await apiService.kyPostWithoutToken(`/users/reset-password/${token}`, {
      new_password: newPassword.value
    });
    if (response.success) {
      showToast("Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.", true);
      router.push({ name: 'login' });
    } else {
      showToast("Erreur lors de la réinitialisation du mot de passe.", false);
    }
  } catch (error) {
    console.error(error);
    showToast("Erreur lors de la réinitialisation du mot de passe.", false);
  }
};
</script>
<template>
  <div class="reset-password">
    <h2>Réinitialiser votre mot de passe</h2>
    <form @submit.prevent="resetPassword">
      <div class="container">
        <BaseInput label="Nouveau mot de passe" id="new-password" name="new-password" v-model="newPassword" type="password"
          placeholder="Entrer un nouveau mot de passe" />
      </div>
      <div class="container">
        <BaseInput label="Confirmer le mot de passe" id="confirm-password" name="confirm-password" v-model="confirmPassword" type="password"
          placeholder="Confirmer le mot de passe" />
      </div>
      <button type="submit" class="button-primary">Réinitialiser le mot de passe</button>
    </form>
  </div>
</template>

<style scoped lang="scss">

form, .reset-password  {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

form {
  width: clamp(300px, 50%, 500px);
}

.reset-password{
  padding-top: 5rem;
}

.container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
}

label {
  font-size: 12px;
  font-weight: 500;
  position: relative;
  margin-bottom: -18px;
  background-color: #fff;
  width: fit-content;
  margin-left: 13px;
  margin-top: 5px;
  color: #94A3B8;
}

input {
  border: 1px solid #94A3B8;
  border-radius: 8px;
  padding: 12px;
  margin-top: 0.5rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  width: 100%;

  &::placeholder {
    color: #94A3B8;
  }

  &:focus {
    outline: none;
  }
}

button {
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem 0;

}
</style>
