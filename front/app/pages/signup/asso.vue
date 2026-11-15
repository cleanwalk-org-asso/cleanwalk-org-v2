<script setup lang="ts">
definePageMeta({ name: 'signupAsso', layout: 'bare' })

usePageSeo({
  title: 'Inscription Association | Cleanwalk.org',
  description: 'Inscrivez votre association sur Cleanwalk.org.',
})
</script>

<template>
  <AuthSignupForm
    role="ASSOCIATION"
    title="Créer votre compte association"
    name-label="Nom de votre association/Organization ?"
    name-placeholder="Cleanwalk.org"
    name-required-message="Veuillez renseigner le nom de l'association"
  />
</template>
