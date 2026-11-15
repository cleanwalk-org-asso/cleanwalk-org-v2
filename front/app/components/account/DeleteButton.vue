<script setup lang="ts">
const accountStore = useAccountStore()
const { showToast } = useUtilsStore()

const open = ref(false)
const password = ref('')
const pending = ref(false)

// Le mot de passe saisi ne doit pas rester dans le champ après fermeture.
watch(open, (isOpen) => {
  if (!isOpen) password.value = ''
})

const deleteAccount = async () => {
  if (!password.value) {
    showToast('Veuillez confirmer votre mot de passe', false)
    return
  }
  pending.value = true
  const result = await accountStore.deleteAccount(password.value)
  pending.value = false
  if (result === 'wrong-password') {
    showToast('Mot de passe incorrect', false)
  } else if (result === 'error') {
    showToast('Erreur lors de la clôture du compte', false)
  }
}
</script>

<template>
  <div class="mt-5 w-full text-right">
    <BaseModal v-model:open="open" title="Clôturer son compte" title-class="text-error">
      <p class="mb-4 px-4 text-xs">
        Êtes-vous certain de vouloir clôturer votre compte ? Cette action est irréversible et toutes vos données seront définitivement supprimées.
      </p>
      <form id="delete-account-form" class="px-4 text-left" @submit.prevent="deleteAccount">
        <BaseInput
          v-model="password"
          name="confirm-delete-password"
          type="password"
          label="Confirmez votre mot de passe"
          placeholder="Votre mot de passe actuel"
          autocomplete="current-password"
          required
        />
      </form>
      <template #actions>
        <BaseButton variant="neutral" class="flex-1" @click="open = false">Annuler</BaseButton>
        <BaseButton variant="danger" class="flex-1" type="submit" form="delete-account-form" :disabled="pending">
          Confirmer
        </BaseButton>
      </template>
    </BaseModal>

    <button type="button" class="text-error underline opacity-80 hover:opacity-100" @click="open = true">
      Clôturer son compte
    </button>
  </div>
</template>
