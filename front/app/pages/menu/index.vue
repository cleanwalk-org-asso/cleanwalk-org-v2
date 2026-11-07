<script setup lang="ts">
definePageMeta({ name: 'menu' })

usePageSeo({
  title: 'Menu | Cleanwalk.org',
  description: 'Accédez aux options de navigation.',
})
</script>

<template>
  <div>
    <TopBar page-name="Menu" />
    <AccountMenu />
  </div>
</template>
