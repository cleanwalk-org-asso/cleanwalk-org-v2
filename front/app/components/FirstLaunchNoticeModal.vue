<script setup lang="ts">
const STORAGE_KEY = 'cleanwalk_v2_notice_seen'
const isVisible = ref(false)

onMounted(() => {
  isVisible.value = localStorage.getItem(STORAGE_KEY) !== 'true'
})

const onClose = () => {
  localStorage.setItem(STORAGE_KEY, 'true')
  isVisible.value = false
}
</script>

<template>
  <BaseModal
    v-model:open="isVisible"
    panel-class="max-w-2xl rounded-xl p-6"
    @close="onClose"
  >
    <div class="-mt-8 flex flex-col gap-3">
      <h2 class="mr-8 text-2xl font-bold text-primary">Bienvenue sur Cleanwalk V2</h2>
      <p>Cette version est en cours de reconstruction : toutes les fonctionnalités ne sont pas encore disponibles.</p>
      <p>Le projet est porté par une équipe bénévole, donc les évolutions arrivent progressivement.</p>
      <p>Les données ont été réinitialisées afin de respecter les obligations RGPD.</p>
      <BaseButton :to="{ name: 'signup' }" size="sm" class="mt-3 w-fit font-semibold" @click="onClose">
        Créer un compte
      </BaseButton>
    </div>
  </BaseModal>
</template>
