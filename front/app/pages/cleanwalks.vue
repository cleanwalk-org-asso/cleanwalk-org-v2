<script setup lang="ts">
definePageMeta({ name: 'map' })

usePageSeo({
  title: 'Carte des Cleanwalk | Cleanwalk.org',
  description: 'Trouvez et rejoignez des événements de nettoyage près de chez vous.',
})

const { isMobile } = useDevice()
const cleanwalkStore = useCleanwalkStore()

onMounted(() => {
  cleanwalkStore.getAllCleanwalks()
})
</script>

<template>
  <ClientOnly>
    <MapMobileMap v-if="isMobile" />
    <MapDesktopMap v-else />
  </ClientOnly>
</template>
