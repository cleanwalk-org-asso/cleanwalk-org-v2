<script setup lang="ts">
definePageMeta({ name: 'resetPassword', layout: 'bare' })

usePageSeo({
  title: 'Réinitialiser le mot de passe | Cleanwalk.org',
  description: 'Créez un nouveau mot de passe pour votre compte.',
})

const { $api: api } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const { showToast } = useUtilsStore()

const newPassword = ref('')
const confirmPassword = ref('')

const resetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    showToast('Les mots de passe ne correspondent pas.', false)
    return
  }
  try {
    await api.post('auth/reset-password', { json: { token: route.params.token, password: newPassword.value } })
    showToast('Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.', true)
    await router.push({ name: 'login' })
  } catch {
    showToast('Erreur lors de la réinitialisation du mot de passe.', false)
  }
}
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center px-8 pt-20">
    <h2>Réinitialiser votre mot de passe</h2>
    <form class="flex w-[clamp(300px,50%,500px)] flex-col items-center justify-center gap-4" @submit.prevent="resetPassword">
      <BaseInput v-model="newPassword" label="Nouveau mot de passe" name="new-password" type="password" placeholder="Entrer un nouveau mot de passe" autocomplete="new-password" />
      <BaseInput v-model="confirmPassword" label="Confirmer le mot de passe" name="confirm-password" type="password" placeholder="Confirmer le mot de passe" autocomplete="new-password" />
      <BaseButton type="submit" size="sm" block>Réinitialiser le mot de passe</BaseButton>
    </form>
  </div>
</template>
