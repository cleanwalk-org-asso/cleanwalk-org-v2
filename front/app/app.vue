<script setup lang="ts">
useHead({
  titleTemplate: (title) => title || 'Cleanwalk.org - Événements de Nettoyage Citoyen',
})
</script>

<template>
  <BaseToast />
  <FirstLaunchNoticeModal />
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>
