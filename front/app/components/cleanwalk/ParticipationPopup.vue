<script setup lang="ts">

const MAX_PARTICIPANTS = 5

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ confirm: [participantCount: number] }>()

const count = ref(1)

watch(open, (isOpen) => {
  if (isOpen) count.value = 1
})
</script>

<template>
  <BaseModal v-model:open="open" title="Validation de la participation au ramassage" panel-class="max-w-120 md:px-12">
    <div class="pt-6 pb-2.5 text-xs">Maximum {{ MAX_PARTICIPANTS }} personnes avec vous</div>
    <div class="flex w-full justify-between">
      <BaseButton class="size-12.5 p-0!" aria-label="Retirer une personne" :disabled="count <= 1" @click="count--">
        <IconMinus />
      </BaseButton>
      <div class="mx-5 grow rounded-lg bg-neutral text-center text-[25px] leading-12.5 font-bold">{{ count }}</div>
      <BaseButton class="size-12.5 p-0!" aria-label="Ajouter une personne" :disabled="count >= MAX_PARTICIPANTS" @click="count++">
        <IconPlus />
      </BaseButton>
    </div>
    <template #actions>
      <BaseButton variant="neutral" class="flex-1" @click="open = false">Annuler</BaseButton>
      <BaseButton class="flex-3" @click="emit('confirm', count)">Valider</BaseButton>
    </template>
  </BaseModal>
</template>
