<script setup lang="ts">
const accountStore = useAccountStore()
const { showToast } = useUtilsStore()

const open = ref(false)

const deleteAccount = async () => {
  const deleted = await accountStore.deleteAccount()
  if (!deleted) {
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
      <template #actions>
        <BaseButton variant="neutral" class="flex-1" @click="open = false">Annuler</BaseButton>
        <BaseButton variant="danger" class="flex-1" @click="deleteAccount">Confirmer</BaseButton>
      </template>
    </BaseModal>

    <button type="button" class="text-error underline opacity-80 hover:opacity-100" @click="open = true">
      Clôturer son compte
    </button>
  </div>
</template>
