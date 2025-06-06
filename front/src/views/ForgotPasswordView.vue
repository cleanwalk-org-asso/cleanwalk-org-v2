<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '@/services/apiService';
import { useUtilsStore } from '@/stores/UtilsStore';
import BaseInput from '@/components/base/BaseInput.vue';

const showToast = useUtilsStore().showToast;
const email = ref<string>('');
const router = useRouter();

const emailForgotPassword = async () => {
  try {
    const response = await apiService.kyPostWithoutToken( "/users/send-reset-email", {
        email: email.value,
    });
    if (response.success) {
      showToast("Demande de réinitialisation du mot de passe réussie. Veuillez vérifier votre email.", true);
      router.push({ name: 'login' });
    } else {
      showToast("Erreur lors de la demande de réinitialisation du mot de passe. Veuillez vérifier l'email ou essayer à nouveau.", false);
      }
  } catch (error) {
    console.error(error);
    showToast("Erreur lors de la demande de réinitialisation du mot de passe. Veuillez vérifier l'email ou essayer à nouveau.", false);
  }
};
</script>

<template>
  <div class="request-password-reset">
    <h2>Demander une réinitialisation du mot de passe</h2>
    <form @submit.prevent="emailForgotPassword">
      <div class="container">
        <label for="email">Email :</label>
        <BaseInput id="email" name="email" v-model="email" type="email" placeholder="Entrer votre email" />
      </div>
      <button type="submit" class="button-primary">Demander la réinitialisation</button>
    </form>
  </div>
</template>
<style scoped lang="scss">
.request-password-reset {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 5rem;

  form {
    width: 100%;
    max-width: 400px;
  }
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
button {
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem 0;
}
</style>
