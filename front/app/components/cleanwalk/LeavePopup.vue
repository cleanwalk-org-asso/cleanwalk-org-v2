<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ confirm: [] }>()
</script>

<template>
  <BaseModal v-model:open="open" title="Se désinscrire">
    <p class="mb-6 px-4 text-xs">Êtes-vous certain de vouloir vous désinscrire de la cleanwalk ?</p>
    <template #actions>
      <BaseButton variant="neutral" class="flex-1" @click="open = false">annuler</BaseButton>
      <BaseButton variant="danger" class="flex-1" @click="emit('confirm')">confirmer</BaseButton>
    </template>
  </BaseModal>
</template>
