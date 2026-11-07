<script setup lang="ts">
definePageMeta({ name: 'menuProfile', middleware: 'auth' })

usePageSeo({
  title: 'Votre Profil | Cleanwalk.org',
  description: 'Gérez votre compte et préférences.',
})
</script>

<template>
  <div>
    <TopBar page-name="Profile" back-url="/menu" />
    <AccountProfile />
  </div>
</template>
