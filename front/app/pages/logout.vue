<script setup lang="ts">
definePageMeta({ name: 'logout', layout: 'bare' })

usePageSeo({
  title: 'Déconnexion | Cleanwalk.org',
  description: 'Déconnexion de votre compte Cleanwalk.org.',
})

const accountStore = useAccountStore()

onMounted(async () => {
  try {
    await accountStore.logout()
  } catch {
    await navigateTo({ name: 'home' })
  }
})
</script>

<template>
  <p class="p-8 text-center text-muted">Déconnexion…</p>
</template>
