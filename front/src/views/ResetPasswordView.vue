<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiHelper from '@/helpers/apiHelper';

const newPassword = ref<string>('');
const confirmPassword = ref<string>('');
const route = useRoute();
const router = useRouter();
const token = route.params.token;

const resetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }
  try {
    const response = await apiHelper.kyPostWithoutToken(`/users/reset-password/${token}`, {
      new_password: newPassword.value
    });
    if (response.success) {
      alert(response.data.message);
      router.push('/login');
    } else {
      alert("Erreur lors de la réinitialisation du mot de passe. Veuillez vérifier le lien ou essayer à nouveau.");
    }
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la réinitialisation du mot de passe. Veuillez vérifier le lien ou essayer à nouveau.");
  }
};
</script>
<template>
  <div class="reset-password">
    <h2>Réinitialiser votre mot de passe</h2>
    <form @submit.prevent="resetPassword">
      <div>
        <label for="new-password">Nouveau mot de passe :</label>
        <input id="new-password" v-model="newPassword" type="password" placeholder="Entrer un nouveau mot de passe" required />
      </div>
      <div>
        <label for="confirm-password">Confirmer le mot de passe :</label>
        <input id="confirm-password" v-model="confirmPassword" type="password" placeholder="Confirmer le nouveau mot de passe" required />
      </div>
      <button type="submit">Réinitialiser le mot de passe</button>
    </form>
  </div>
</template>
<style scoped>
.reset-password {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
}
</style>