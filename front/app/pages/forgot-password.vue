<script setup lang="ts">
definePageMeta({ name: 'forgotPassword', layout: 'bare' })

usePageSeo({
  title: 'Mot de passe oublié | Cleanwalk.org',
  description: 'Demandez la réinitialisation de votre mot de passe.',
})

const { $api: api } = useNuxtApp()
const router = useRouter()
const { showToast } = useUtilsStore()

const email = ref('')

const requestReset = async () => {
  try {
    await api.post('auth/forgot-password', { json: { email: email.value } })
    showToast('Demande de réinitialisation du mot de passe réussie. Veuillez vérifier votre email.', true)
    await router.push({ name: 'login' })
  } catch {
    showToast("Erreur lors de la demande de réinitialisation du mot de passe. Veuillez vérifier l'email ou essayer à nouveau.", false)
  }
}
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center px-8 pt-20">
    <h2>Demander une réinitialisation du mot de passe</h2>
    <form class="w-full max-w-100" @submit.prevent="requestReset">
      <BaseInput v-model="email" class="mb-4" name="email" type="email" label="Email :" placeholder="Entrer votre email" autocomplete="email" />
      <BaseButton type="submit" size="sm" block class="mt-4">Demander la réinitialisation</BaseButton>
    </form>
  </div>
</template>
