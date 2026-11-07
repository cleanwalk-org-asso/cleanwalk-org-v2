<script setup lang="ts">
definePageMeta({ name: 'addCleanwalk', middleware: 'auth' })

usePageSeo({
  title: 'Créer un Événement | Cleanwalk.org',
  description: 'Organisez une cleanwalk dans votre région.',
})
</script>

<template>
  <div>
    <TopBar back-url="/cleanwalks" page-name="Ajouter une cleanwalk" />
    <CleanwalkAddForm />
  </div>
</template>
