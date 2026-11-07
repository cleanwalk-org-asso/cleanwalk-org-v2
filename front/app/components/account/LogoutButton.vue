<script setup lang="ts">
const accountStore = useAccountStore()
const open = ref(false)
</script>

<template>
  <div class="w-full">
    <BaseModal v-model:open="open" title="Se déconnecter">
      <p class="mb-6 px-4 text-xs">Êtes-vous certain de vouloir vous déconnecter ?</p>
      <template #actions>
        <BaseButton variant="neutral" class="flex-1" @click="open = false">annuler</BaseButton>
        <BaseButton variant="danger" class="flex-1" @click="accountStore.logout()">confirmer</BaseButton>
      </template>
    </BaseModal>

    <button
      type="button"
      class="mt-12.5 flex w-full items-center rounded-lg border border-border p-4 text-error transition-colors hover:bg-error/5"
      @click="open = true"
    >
      <IconLogOut />
      <h3 class="mx-4 grow text-left text-base font-bold">Se Déconnecter</h3>
      <IconChevronRight />
    </button>
  </div>
</template>
